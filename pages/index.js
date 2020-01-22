import store from 'store-js';
import { 
  Card,
  Page,
  TextField,
  DataTable,
  Button,
  Checkbox,
  Icon,
  Frame,
  Toast,
  ChoiceList,
  Loading
} from '@shopify/polaris';
import {
  StarFilledMinor,
  StarOutlineMinor
} from '@shopify/polaris-icons';
import { Context } from '@shopify/app-bridge-react';
import _ from 'lodash'
import './index.css'
import{ UPDATE_PRODUCTS, constructListproduct, constructSearchProduct }from "../components/graphql"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

class Index extends React.Component {
    static contextType = Context;
    state = {
      fetching:true,
      loading:false,
        searchquery: "",
        replacestring:"",
        matchcase:false,
        saved: false,
        scopes:[],
        scopesV:[],
        fields:[],
        products:[],
        productList:[],
        allproducts:[],
        operation: 'replace',
        cursor: 0,
        total : 0
    }
    componentDidMount(){
      this.fetchQuery()
    }
    getRegexCase(){return this.state.matchcase ? "g" : "gi"}
    getRegex(searchquery){
      return new RegExp(searchquery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), this.getRegexCase());
    }
    async fetchQuery(){
      console.log("fetch")
      this.setState({fetching:true})
      let fetch = true
      let cursor
      while (fetch) {
        const response = await this.props.apolloClient.query({query: constructListproduct(cursor)})
        console.log(response.data)
        fetch = response.data.products.pageInfo.hasNextPage
        cursor = response.data.products.edges[response.data.products.edges.length-1].cursor
        this.setState({allproducts:[...this.state.allproducts, ...response.data.products.edges]})
      }
      this.setState({fetching:false})
    }

    filterQuery(){
      console.log("filter")
      console.log(this.state.allproducts)
      if(this.state.searchquery!=="" && (this.state.scopes.length + this.state.scopesV.length !== 0) && (this.state.allproducts !== 0) ){
        const currentproducts = this.state.allproducts.filter(prod=>{
          const regx = this.getRegex(this.state.searchquery);
          return this.state.scopes.some(sco=>{
            if(sco==="tags"){
              return (prod.node[sco].join("/n").search(regx)>-1)
            }
            return (prod.node[sco].search(regx)>-1)
          })
        })
        console.log(currentproducts)
        this.setState({products: currentproducts, productList: this.ConvertDatatoTable(currentproducts, 0),cursor:0})
      }else{
        this.setState({products:[], productList:[]})
      }
    }

    getHeader(){
      let scopes = this.state.scopes
      if(this.state.operation === "insert" || this.state.operation === "append"){
        scopes = [...scopes, ...this.state.fields.filter(sco=>scopes.findIndex(s=>s===sco)===-1)]
      }
      return ["title","handle",...scopes.filter(sco=>(sco!=="title" && sco!=="handle"))]
    }
    getHeaderType(){
      return Array(this.state.scopes.length).fill('text')
    }

    isScopeSelected(scope, field){
      if (field === undefined) field = 0
      const scopetype = ["scopes", "scopesV", "fields"][field]
      return (this.state[scopetype].findIndex(sco=>sco===scope)>-1)
    }

    handleScopeSelect=(scope,field)=>()=>{
      if (field === undefined) field = 0
      const scopetype = ["scopes", "scopesV", "fields"][field]
      const scopes = this.state[scopetype]
      const newscope = ["title","handle","productType","vendor","tags","description"].filter(scop=>{
        if (scop === scope) return (scopes.findIndex(sco=>sco===scop) === -1)
        return (scopes.findIndex(sco=>sco===scop) > -1)
      })
      this.setState({[scopetype]: newscope},()=>{
        this.filterQuery()
      })
    }

    toggleFavorite = () => {
      console.log("toggle fav")
      const favorite = store.get('favorite')
      const searchform = _.pick(this.state, ['searchquery', 'replacestring', 'matchcase','scopes', 'operation'])
      const hashedfav = Object.keys(searchform).sort().map(x => searchform[x].toString()).join(";");
      if(!this.state.saved){
        if (!store.get('favorite')){
          console.log("no current fav")
          console.log("hashedfav:" + hashedfav)
          store.set("favorite",{[hashedfav]:searchform})
        }else{
          console.log(store.get('favorite'))
          store.set("favorite",{...favorite, [hashedfav]:searchform})
        }
        this.setState({ saved:true })
      }else{
        delete favorite[hashedfav]
        store.set("favorite",favorite)
        this.setState({ saved:false })
      }
    }

    handleChange = (field) =>  (value) => {
      if (field==="operation"){
        value = value[0]
      }
      this.setState({ [field]: value }, ()=>{
        const searchform = _.pick(this.state, ['searchquery', 'replacestring', 'matchcase','scopes'])
        const hashedfav = Object.keys(searchform).sort().map(x => searchform[x].toString()).join(";");
        const saved = store.get('favorite') && store.get('favorite')[hashedfav]
        this.setState({ saved })
        if (field && field!=="operation" && field!=="replacestring"){
          this.filterQuery()
        }
      })
    };


    handleReplaceAll = () => {
      if(!this.state.products || this.state.products.length<1){
        return 
      }
      this.setState({ loading:true })
      const promises = this.state.products.length
      let count = promises
      this.state.products.map((item,idx)=>{
        this.props.apolloClient.mutate({
          mutation: UPDATE_PRODUCTS,
          variables:{input:this.transformData(item.node)}
        })
        .then(response=>{
          console.log(response)
          count -= 1
          if(count === 0){
            this.fetchQuery()
            this.setState({ loading:false, showtoast:true, products:[], toastcontent: `${promises} products changed.`, cursor: 0 })
          }
        })
      })
    }

    handleReplace = () => {
      if(!this.state.products || this.state.products.length<1){
        return 
      }
      this.setState({ loading:true })
      const currentCursor = this.FindTextByCursor(this.state.products, this.state.cursor)
      console.log(currentCursor)
      const promises = this.state.products.length
      let count = promises
      this.props.apolloClient.mutate({
        mutation: UPDATE_PRODUCTS,
        variables:{input:this.transformData(this.state.products[currentCursor.index].node, currentCursor.sco, currentCursor.count)}
      })
      .then(response=>{
        console.log(response)
          this.setState({ loading:false, showtoast:true, toastcontent: `products change submitted.` })
      })
    }

    //handle data manipulation
    transformData = (data, scope, count)=>{
      const searchquery = this.getRegex(this.state.searchquery);
      const replacestring = this.state.replacestring
      let result = {id:data.id}
      const { operation } = this.state
      if(scope!== undefined ){
        console.log(scope, count)
        if(scope==="tags"){
          if (operation === "insert"){
            result[scope] = [ replacestring, ...data[scope]]
          }else if (operation === "append"){
            result[scope] = [...data[scope], replacestring]
          }else{
            let nth = -1
            result[scope] = data[scope].join(", ").replace(searchquery, function (x) {
              nth++
              if (count === nth){
                return replacestring;
              }
              return x;
            }).split(", ")
          }
          data[scope] = result[scope]
        }else if(scope==="description"){
          if (operation === "insert"){
            result["descriptionHtml"] = `<p>${replacestring}</p><p>` + data[scope] + '</p>'
            data[scope] = replacestring + data[scope]
          }else if (operation === "append"){
            result["descriptionHtml"] = '<p>' + data[scope] + `</p><p>${replacestring}</p>`
            data[scope] = data[scope] + replacestring
          }else{
            let nth = -1
            data[scope] = data[scope].replace(searchquery, function (x) {
              nth++
              if (count === nth){
                return replacestring;
              }
              return x;
            })
            result["descriptionHtml"] = '<p>' + data[scope] + '</p>'
          }
        }else{
          if (operation === "insert"){
            result[scope] = replacestring + data[scope]
          }else if (operation === "append"){
            result[scope] = data[scope] + replacestring
          }else{
            let nth = -1
            result[scope] = data[scope].replace(searchquery, function (x) {
              nth++
              if (count === nth){
                return replacestring;
              }
              return x;
            })
          }
          data[scope] = result[scope]
        }
        const newproducts = this.state.products.map(p=>{
          if(data.id === p.node.id) return {...p, node: data}
          return p
        })
        this.setState({products:newproducts, productList:this.ConvertDatatoTable(this.state.products,this.state.cursor)})
        return result
      }
      this.state.scopes.map(sco=>{
        if(sco==="tags"){
          if (operation === "insert"){
            result[sco] = [ replacestring, ...data[sco]]
          }else if (operation === "append"){
            result[sco] = [...data[sco], replacestring]
          }else{
            result[sco] = data[sco].map(tag=>tag.replace(searchquery, replacestring))
          }
        }else if(sco==="description"){
          if (operation === "insert"){
            result[sco] = `<p>${replacestring}</p><p>` + data[sco] + '</p>'
          }else if (operation === "append"){
            result[sco] = '<p>' + data[sco] + `</p><p>${replacestring}</p>`
          }else{
            result["descriptionHtml"] = '<p>' + data[sco].replace(searchquery, replacestring) + '</p>'
          }
        }else{
          if (operation === "insert"){
            result[sco] = replacestring + data[sco]
          }else if (operation === "append"){
            result[sco] = data[sco] + replacestring
          }else{
            result[sco] = data[sco].replace(searchquery, replacestring)
          }
        }
      })
      return result
    }

    
    InjectHighlight = (text, count) => {
      if (!text){
        return "NA"
      }
      const replace = this.getRegex(this.state.searchquery);
      let nth = -1
      return (
        <span dangerouslySetInnerHTML={{ __html : text.replace(replace, function (x) {
              nth++
              if (count !== undefined && count === nth){
                console.log(count, text)
                return `<span style="background-color:#3297FD; color:white">${x}</span>`;
              }
              return `<span style="background-color:yellow">${x}</span>`;
            })
          }} />
      )
    }

    HandleTagDisplay(node){
      return {...node, tags:node.tags.join("/n") }
    }

    FindTextByCursor(data, cursor){
      console.log("find cursor")
      let counter = 0
      let result
      const replace = this.getRegex(this.state.searchquery);
      for (let index = 0; index < data.length; index++) {
        const node = this.HandleTagDisplay(data[index].node);
        for (let scoid = 0; scoid < this.state.scopes.length; scoid++) {
          const sco = this.state.scopes[scoid]
          const count = node[sco].match(replace) ? node[sco].match(replace).length : 0
          if (result === undefined && count + counter > cursor){
            result = {index:index ,sco: sco, count : (cursor - counter) }
          }
          counter += count
        }
      }
      return {...result, total:counter}
    }
    //format data to display in table
    ConvertDatatoTable = (data, cursor) =>{
      console.log("convert data")
      if (!data || data.length < 1){
        return [[]]
      }
      const currentCursor = this.FindTextByCursor(data, cursor)
      console.log(currentCursor)
      this.setState({total: currentCursor.total})
      return data.map((item,id)=>{
        const node = this.HandleTagDisplay(item.node)
        return this.getHeader().map((sco)=>{
          if(this.state.scopes.findIndex(sc=>sc===sco)===-1){
            return node[sco]
          }
          if(id===currentCursor.index && sco === currentCursor.sco){
            return this.InjectHighlight(node[sco],currentCursor.count)
          }
          return this.InjectHighlight(node[sco])
        })
      })
    }




    next(){
      const cursor = this.state.cursor+1 >= this.state.total ? 0 : this.state.cursor + 1 
      this.setState({productList: this.ConvertDatatoTable(this.state.products, cursor), cursor})
    }
    previous(){
      const cursor = this.state.cursor-1 < 0 ? this.state.total - 1 : this.state.cursor - 1 
      this.setState({productList: this.ConvertDatatoTable(this.state.products, cursor), cursor})
    }
    
    render() {
      const app = this.context;
      const placeholder = {
        "replace": "Replace",
        "insert": "Insert",
        "append": "Append"
      }
    return (
      <Page fullWidth>
      <Frame>
        <div className="form-container">
          {(this.state.loading || this.state.fetching) && <Loading />}
          <h3><b>Search keywords: </b></h3>
          <div className="form-row find-text">
            <div className="form-input" >
              <TextField placeholder="Find" value={this.state.searchquery} onChange={this.handleChange('searchquery')} />
            </div>
            <Button className="" onClick={this.previous.bind(this)}> <FontAwesomeIcon icon={faChevronUp} /> </Button>
            <Button className="" onClick={this.next.bind(this)}> <FontAwesomeIcon icon={faChevronDown} /> </Button>
            {(!this.state.total && this.state.searchquery !== "") && (<p style={{color:"red", fontWeight: "bold"}}>No result</p>)}
            {(this.state.total > 0 && this.state.searchquery !== "") && (<p style={{fontWeight: "bold"}}>{this.state.cursor + 1} of {this.state.total}</p>)}
          </div>
          
          <h3><b>In fields: </b></h3>
          <div className="form-row field-list">
              <Checkbox label="Title" checked={this.isScopeSelected('title')} onChange={this.handleScopeSelect('title')} />
              <Checkbox label="Handle" checked={this.isScopeSelected('handle')} onChange={this.handleScopeSelect('handle')} />
              <Checkbox label="Product types" checked={this.isScopeSelected('productType')} onChange={this.handleScopeSelect('productType')} />
              <Checkbox label="Vendor" checked={this.isScopeSelected('vendor')} onChange={this.handleScopeSelect('vendor')} />
              <Checkbox label="Tags" checked={this.isScopeSelected('tags')} onChange={this.handleScopeSelect('tags')} />
              <Checkbox label="Description" checked={this.isScopeSelected('description')} onChange={this.handleScopeSelect('description')} />
          </div>
          <hr/>
          {/* <h3><b>Variant fields</b>(not in use): </h3>
          <div className="form-row">
              <Checkbox label="Price" disabled checked={this.isScopeSelected('price',1)} onChange={this.handleScopeSelect('price',1)} />
              <Checkbox label="SKU" disabled checked={this.isScopeSelected('sku',1)} onChange={this.handleScopeSelect('sku',1)} />
          </div> */}


          <h3><b>Operation: </b></h3>
          <div className="form-row">
            <ChoiceList
              choices={[
                {label: 'Place keywords', value: 'replace'},
                {label: 'Insert in front', value: 'insert'},
                {label: 'Append to end', value: 'append'},
              ]}
              selected={this.state.operation}
              onChange={this.handleChange('operation')}
            />
          </div>

          <div className="form-row replace-text">
            <div className="form-input" >
              <TextField placeholder={placeholder[this.state.operation] + " text"}  value={this.state.replacestring} onChange={this.handleChange('replacestring')} />
            </div>

            <Button className="form-button" loading={this.state.loading} onClick={this.handleReplace.bind(this)}>{placeholder[this.state.operation]} </Button>
            <Button className="form-button" loading={this.state.loading} onClick={this.handleReplaceAll.bind(this)}>{placeholder[this.state.operation]} all</Button>
          </div>

          {/* {this.state.operation !== "replace" && <div><h3><b>{placeholder[this.state.operation]} in fields: </b></h3>
          <div className="form-row field-list">
              <Checkbox label="Title" checked={this.isScopeSelected('title', 2)} onChange={this.handleScopeSelect('title', 2)} />
              <Checkbox label="Handle" checked={this.isScopeSelected('handle', 2)} onChange={this.handleScopeSelect('handle', 2)} />
              <Checkbox label="Product types" checked={this.isScopeSelected('productType', 2)} onChange={this.handleScopeSelect('productType', 2)} />
              <Checkbox label="Vendor" checked={this.isScopeSelected('vendor', 2)} onChange={this.handleScopeSelect('vendor', 2)} />
              <Checkbox label="Tags" checked={this.isScopeSelected('tags', 2)} onChange={this.handleScopeSelect('tags', 2)} />
              <Checkbox label="Description" checked={this.isScopeSelected('description', 2)} onChange={this.handleScopeSelect('description', 2)} />
          </div></div>} */}

          <h3><b>Options: </b></h3>
          <div className="form-row option-list">
            <Checkbox label="Match case" checked={this.state.matchcase} onChange={this.handleChange('matchcase')} />
            <a  className="form-item" onClick={this.toggleFavorite.bind(this)} >
              <Icon source={this.state.saved ? StarFilledMinor : StarOutlineMinor} />
              <p>{this.state.saved ? "Saved" : "Save to Favorite"}</p>
            </a>
          </div>

        </div>
        <Card>
          <DataTable
            columnContentTypes={this.getHeaderType()}
            headings={this.getHeader()}
            rows={this.state.productList}
          />
        </Card>
        {this.state.showtoast ? (<Toast content={this.state.toastcontent} onDismiss={() => this.setState({showtoast:false})} />) : null}
      </Frame>
      </Page>
    );
  }
}

export default Index;