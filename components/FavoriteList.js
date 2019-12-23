import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Card,
    ResourceList,
    Stack,
    TextStyle,
    ResourceItem,
    TextField,
    Thumbnail,
    DataTable,
    Button,
    Checkbox,
    Icon
 } from '@shopify/polaris';
 import {
  StarFilledMinor,
  StarOutlineMinor
} from '@shopify/polaris-icons';
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';
import { useMutation } from '@apollo/react-hooks';
import _ from 'lodash'
import './ResourceList.css'
import{ UPDATE_PRODUCTS, SEARCH_PRODUCTS }from "./graphql.js"

class ResourceListWithProducts extends React.Component {
    static contextType = Context;
    state = {
        favorites:{},
        bundles:{},
        selectedItems: [],

    }
    getRegexCase(matchcase){return matchcase ? "g" : "gi"}
    transformData = (data, searchquery, replacestring, scopes, matchcase)=>{
        const regsearchquery = new RegExp(searchquery, this.getRegexCase(matchcase));
        let result = {id:data.id}
        scopes.map(sco=>{
            if(sco==="tags"){
                result[sco] = data[sco].map(tag=>tag.replace(regsearchquery, replacestring))
            }else if(sco==="description"){
                result["descriptionHtml"] = data[sco].replace(regsearchquery, replacestring)
            }else{
                result[sco] = data[sco].replace(regsearchquery, replacestring)
            }
        })
        console.log(result)
        return result
    }
    handleReplace = (products, searchquery, replacestring, scopes, matchcase) => {
        if(!products || products.length<1){
            return 
        }
        products.edges.map(item=>{
            this.props.apolloClient.mutate({
                mutation: UPDATE_PRODUCTS,
                variables:{input:this.transformData(item.node, searchquery, replacestring, scopes, matchcase)}
            })
            .then(response=>{
                console.log(response)
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
        // if(Object.keys.length(bundles)===0){
        //     store.set("bundle",{})
        // }
        console.log(favorites)
        console.log(bundles)
        this.setState({favorites, bundles})
    }
    runFavorite(key){
        const  {searchquery, replacestring, scopes, matchcase} = this.state.favorites[key]
        this.props.apolloClient.query({
            query: SEARCH_PRODUCTS,
            variables:{searchquery}
        })
        .then(response=>{
            console.log(response)
            if(response && response.data && response.data.products){
                this.handleReplace(response.data.products,searchquery, replacestring, scopes, matchcase)
            }else{
                console.log("no item found")
            }
        })
    }
    removeFavorite(key){
        const { favorites } = this.state
        delete favorites[key]
        store.set("favorite",favorites)
        this.setState({favorites})
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
        bundle.map(fav => {
            const  {searchquery, replacestring, scopes, matchcase} = fav
            this.props.apolloClient.query({
                query: SEARCH_PRODUCTS,
                variables:{searchquery}
            })
            .then(response=>{
                console.log(response)
                if(response && response.data && response.data.products){
                    this.handleReplace(response.data.products,searchquery, replacestring, scopes, matchcase)
                }else{
                    console.log("no item found")
                }
            })
        })
    }
    
    render() {
      const app = this.context;
      const redirectToProduct = () => {
        const redirect = Redirect.create(app);
        redirect.dispatch(
          Redirect.Action.APP,
          '/edit-products',
        );
      };
    return (
        <div>
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
            const {key, searchquery, replacestring, matchcase, scopes} = item;
            const shortcutActions = [
                {
                    content: 'Run',
                    onAction: ()=>this.runFavorite(key),
                }, {
                    content: 'Remove',
                    onAction: ()=>this.removeFavorite(key),
                }]
              
            return (
                <ResourceItem
                id={key}
                shortcutActions={shortcutActions}
                persistActions
                name={searchquery}
                >
                <h3>
                <TextStyle variation="strong">{searchquery} | </TextStyle>
                <TextStyle variation="subdued">in ({scopes.toString()})</TextStyle>
                </h3>
                <div>Replace with :"{replacestring}" {matchcase ? "(Case Sensitive)" : "(Case Insensitive)"}</div>
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
            console.log(item)
            const shortcutActions = [
                {
                    content: 'Run',
                    onAction: ()=>this.runBundle(key),
                }, {
                    content: 'Unbundle',
                    onAction: ()=>this.unbundle(key),
                }]
              
            return (
                <ResourceItem
                id={key}
                shortcutActions={shortcutActions}
                >
                <h3>
                    <TextStyle variation="strong">Bundle</TextStyle>
                </h3>
                {content.map((item)=>{
                    return (<div>Find: "{item.searchquery}" in ({item.scopes.toString()}); Replace with :"{item.replacestring}" {item.matchcase ? "(Case Sensitive)" : "(Case Insensitive)"}</div>)
                })}
                </ResourceItem>
            );
            }}
        />
        </Card>
        </div>
    );
  }
}

 export default ResourceListWithProducts;