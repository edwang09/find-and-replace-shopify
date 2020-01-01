const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
import { EmptyState, Layout, Page, Card, 
    ResourceList,
    TextStyle,
    ResourceItem,
    Toast,
    Frame
 } from '@shopify/polaris';
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';
import _ from 'lodash'
import{ UPDATE_PRODUCTS, LIST_PRODUCTS }from "../components/graphql"

class Favorite extends React.Component {
    static contextType = Context;
    state = {
        emptyState:false,
        favorites:{},
        bundles:{},
        selectedItems: [],
        loading: "",
        toasts:[]

    }
    randomString(length) {
        return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    }
    getRegexCase(matchcase){return matchcase ? "g" : "gi"}
    transformData = (data, searchquery, replacestring, scopes, matchcase, operation)=>{
        const regsearchquery = new RegExp(searchquery, this.getRegexCase(matchcase));
        let result = {id:data.id}
        scopes.map(sco=>{
            if(sco==="tags"){
                if (operation === "insert"){
                  result[sco] = [ replacestring, ...data[sco]]
                }else if (operation === "append"){
                  result[sco] = [...data[sco], replacestring]
                }else{
                  result[sco] = data[sco].map(tag=>tag.replace(regsearchquery, replacestring))
                }
              }else if(sco==="description"){
                if (operation === "insert"){
                  result[sco] = `<p>${replacestring}</p><p>` + data[sco] + '</p>'
                }else if (operation === "append"){
                  result[sco] = '<p>' + data[sco] + `</p><p>${replacestring}</p>`
                }else{
                  result["descriptionHtml"] = '<p>' + data[sco].replace(regsearchquery, replacestring) + '</p>'
                }
              }else{
                if (operation === "insert"){
                  result[sco] = replacestring + data[sco]
                }else if (operation === "append"){
                  result[sco] = data[sco] + replacestring
                }else{
                  result[sco] = data[sco].replace(regsearchquery, replacestring)
                }
            }
        })
        console.log(result)
        return result
    }
    handleReplace = (products, searchquery, replacestring, scopes, matchcase, operation) => {
        return new Promise((resolve, reject)=>{
            if(!products || products.length<1){
                reject("no product") 
            }
            const promises =products.length
            let count = promises
            products.map(item=>{
                this.props.apolloClient.mutate({
                    mutation: UPDATE_PRODUCTS,
                    variables:{input:this.transformData(item.node, searchquery, replacestring, scopes, matchcase, operation)}
                })
                .then(response=>{
                    console.log(response)
                    count -= 1
                    if(count === 0){
                        resolve({promises, searchquery, replacestring})
                    }
                })
            })

        })
    }

    setSelectedItems(selectedItems){
        console.log(selectedItems)
        return this.setState({selectedItems})
    }

    ObjtoArray(obj){
        return Object.keys(obj).map((key)=>{
            return {...obj[key], key}
        })
    }
    ArrayobjtoArray(obj){
        return Object.keys(obj).map((key)=>{
            return {content: obj[key], key}
        })
    }
    componentDidMount(){
      const favorites = store.get("favorite") ? store.get("favorite") : {}
      const bundles = store.get("bundle") ? store.get("bundle") : {}
      const emptyState = (Object.keys(bundles).length + Object.keys(favorites).length) === 0
      this.fetchQuery()
        // if(Object.keys.length(bundles)===0){
        //     store.set("bundle",{})
        // }
        console.log(favorites)
        console.log(bundles)
        this.setState({favorites, bundles, emptyState})
    }
    fetchQuery(){
      this.setState({fetching:true})
      this.props.apolloClient.query({query: LIST_PRODUCTS}).then(response=>this.setState({allproducts:response.data.products.edges, fetching:false}))
    }
    filterQuery(searchquery, scopes, matchcase, operation){
        return new Promise((resolve, reject)=>{
            if(operation==="insert" || opertaion ==="append"){
                return this.state.allproducts
            }else if(searchquery!=="" && (scopes.length !== 0) && (this.state.allproducts.length !== 0) ){
              const currentproducts = this.state.allproducts.filter(prod=>{
                const regx = new RegExp(searchquery, this.getRegexCase(matchcase));
                return scopes.some(sco=>{
                  if(sco==="tags"){
                    return (prod.node[sco].join("/n").search(regx)>-1)
                  }
                  return (prod.node[sco].search(regx)>-1)
                })
              })
              console.log("currentproducts")
              resolve(currentproducts)
            }else{
                resolve([])
            }
        })
      }
    runFavorite(key){
        const  {searchquery, replacestring, scopes, matchcase, operation} = this.state.favorites[key]
        this.setState({ loading:key })
        this.filterQuery(searchquery, scopes, matchcase, operation)
        .then(response=>{
            console.log(response)
            if(response && response.length > 0){
                this.handleReplace(response ,searchquery, replacestring, scopes, matchcase, operation).then((res)=>{
                    this.setState({ loading:null, toasts: [...this.state.toasts, {key: this.randomString(10), content: `${res.promises} products changed.`}] })
                    this.fetchQuery()
                })
            }else{
                this.setState({ loading:null, toasts: [...this.state.toasts, {key: this.randomString(10), content: `no matching product found`}] })
            }
        })
    }
    removeFavorite(key){
        const { favorites } = this.state
        delete favorites[key]
        store.set("favorite",favorites)
        const emptyState = (Object.keys(this.state.bundles).length + Object.keys(favorites).length) === 0
        this.setState({favorites, emptyState})
    }

    createBundle(){
        const { favorites, bundles } = this.state
        const newbundle = this.state.selectedItems.reduce((bundle, key)=>{
            console.log(bundle)
            const fav = favorites[key]
            console.log(fav)
            delete favorites[key]
            return [...bundle,fav]
        },[])
        const newbundlekey = "bundle:"+this.state.selectedItems.join(';')
        console.log(newbundle)
        console.log(newbundlekey)
        console.log(favorites)
        store.set("favorite",favorites)
        let newbundles
        if (!store.get('bundle')){
            console.log("no current bundle")
            newbundles = {[newbundlekey]:newbundle}
        }else{
            newbundles = {...bundles, [newbundlekey]:newbundle}
        }
        store.set("bundle",newbundles)
        this.setState({selectedItems:[], favorites, bundles: newbundles})
    }
    
    unbundle(key){
        const { favorites, bundles } = this.state
        const bundle = bundles[key]
        bundle.map(fav => {
            const hashedfav = Object.keys(fav).sort().map(x => fav[x].toString()).join(";");
            favorites[hashedfav] = fav
        })
        delete bundles[key]
        console.log(bundles)
        console.log(favorites)
        store.set("favorite",favorites)
        store.set("bundle",bundles)
        this.setState({favorites, bundles})
    }

    runBundle(key){
        const bundle = this.state.bundles[key]
        this.setState({loading:key})
        const bundles = bundle.length
        let count = bundles
        bundle.map(fav => {
            const  {searchquery, replacestring, scopes, matchcase, operation} = fav
            this.filterQuery(searchquery, scopes, matchcase, operation)
            .then(response=>{
                console.log(response)
                if(response && response.length > 0){
                    this.handleReplace(response ,searchquery, replacestring, scopes, matchcase, operation).then((res)=>{
                        this.setState({ toasts: [...this.state.toasts, {key: this.randomString(10), content: `${res.promises} products changed.`}] },()=>{
                            count -= 1
                            if (count === 0){
                                this.setState({ loading:null, toasts: [...this.state.toasts, {key: this.randomString(10), content: `bundle completed.`}] })
                                this.fetchQuery()
                            }
                        })
                    })
                }else{
                    this.setState({ toasts: [...this.state.toasts, {key: this.randomString(10), content: `no matching product found.`}] },()=>{
                        count -= 1
                        if (count === 0){
                            this.setState({ loading:null, toasts: [...this.state.toasts, {key: this.randomString(10), content: `bundle completed.`}] })
                            this.fetchQuery()
                        }
                    })
                }
            })
        })
    }
    
    render() {
      const app = this.context;
      const redirectToMain = () => {
        const redirect = Redirect.create(app);
        redirect.dispatch(
          Redirect.Action.APP,
          '/index',
        );
      };
      const toastMarkup = this.state.toasts.map(toast=>{
          return  (<Toast key = {toast.key} content={toast.content} onDismiss={()=>this.setState({toasts:this.state.toasts.filter(to=>to.key !== toast.key)})}/>)
      })
    return (
      <Page>
      { this.state.emptyState ? (
        <Layout>
          <EmptyState
            heading="You dont have favorite yet"
            action={{
              content: 'Go to main page',
              onAction: () => redirectToMain()
            }}
            image={img}
          >
            <p>Create Find and Replace and save it to favorite</p>
          </EmptyState>
        </Layout>
      ) : (
        <Frame>
        <Card>
        <ResourceList
            resourceName={{singular: 'favorite', plural: 'favorites'}}
            items={this.ObjtoArray(this.state.favorites)}
            selectedItems={this.state.selectedItems}
            onSelectionChange={this.setSelectedItems.bind(this)}
            selectable
            promotedBulkActions={[
                {
                  content: 'Bundle',
                  onAction: ()=>this.createBundle(),
                }
            ]}
            renderItem={(item) => {
            const {key, searchquery, replacestring, matchcase, scopes,operation} = item;
            const shortcutActions = [
                {
                    content: 'Run',
                    loading: (this.state.loading === key),
                    onAction: ()=>this.runFavorite(key),
                }, {
                    content: 'Remove',
                    onAction: ()=>this.removeFavorite(key),
                }]
            const title = {
                "find": `Find "${searchquery}"`,
                "insert": "Insert in front",
                "append": "Append to end"
                }
            return (
                <ResourceItem
                id={key}
                key={key}
                shortcutActions={shortcutActions}
                persistActions
                name={searchquery}
                >
                <h3>
                <TextStyle variation="strong">{title[operation]} | </TextStyle>
                <TextStyle variation="subdued">in ({scopes.toString()})</TextStyle>
                </h3>
                <div>{searchquery==='find' ? "Replace" : "" } with :"{replacestring}" {matchcase ? "(Case Sensitive)" : "(Case Insensitive)"}</div>
                </ResourceItem>
            );
            }}
        />
        </Card>

        <Card>
        <ResourceList
            resourceName={{singular: 'bundle', plural: 'bundles'}}
            items={this.ArrayobjtoArray(this.state.bundles)}
            renderItem={(item) => {
            const {key, content} = item;
            const shortcutActions = [
                {
                    content: 'Run',
                    loading: (this.state.loading === key),
                    onAction: ()=>this.runBundle(key),
                }, {
                    content: 'Unbundle',
                    onAction: ()=>this.unbundle(key),
                }]
              
            return (
                <ResourceItem
                id={key}
                key={key}
                persistActions
                shortcutActions={shortcutActions}
                >
                <h3>
                    <TextStyle variation="strong">Bundle</TextStyle>
                </h3>
                {content.map((item)=>{
                    const title = {
                        "find": `Find "${item.searchquery}"`,
                        "insert": "Insert in front",
                        "append": "Append to end"
                    }
                    return (<div>{title[item.operation]} in ({item.scopes.toString()}); {item.searchquery==='find' ? "Replace" : "" } with :"{item.replacestring}" {item.matchcase ? "(Case Sensitive)" : "(Case Insensitive)"}</div>)
                })}
                </ResourceItem>
            );
            }}
        />
        </Card>
        {this.state.showtoast ? (<Toast content={this.state.toastcontent} onDismiss={() => this.setState({showtoast:false})} />) : null}
        {toastMarkup}
        </Frame>
        )}
    </Page>
    );
  }
}

 export default Favorite;