import store from 'store-js';
import { Welcome, Tutorial} from '../components/tutorial'
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
  Loading,
  Modal
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
        operation: '',
        cursor: 0,
        total : 0,
        tutorial: -1
    }
    componentDidMount(){
      const tutorial = store.get('tutorial')
      this.setState({tutorial:0})
      if(tutorial===undefined || tutorial>-1){
        this.setState({tutorial:0})
      }
      this.fetchQuery()
    }
    getRegexCase(){return this.state.matchcase ? "g" : "gi"}
    getRegex(searchquery){
      return new RegExp(searchquery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), this.getRegexCase());
    }
    async fetchQuery(){
      // console.log("fetch")
      this.setState({fetching:true})
      let fetch = true
      let cursor
      while (fetch) {
        const response = await this.props.apolloClient.query({query: constructListproduct(cursor)})
        // console.log(response.data)
        fetch = response.data.products.pageInfo.hasNextPage
        cursor = response.data.products.edges[response.data.products.edges.length-1].cursor
        this.setState({allproducts:[...this.state.allproducts, ...response.data.products.edges]})
      }
      this.setState({fetching:false})
    }

    filterQuery(){
      // console.log("filter")
      // console.log(this.state.allproducts)
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
        // console.log(currentproducts)
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
      // console.log("toggle fav")
      const favorite = store.get('favorite')
      const searchform = _.pick(this.state, ['searchquery', 'replacestring', 'matchcase','scopes', 'operation'])
      const hashedfav = Object.keys(searchform).sort().map(x => searchform[x].toString()).join(";");
      if(!this.state.saved){
        if (!store.get('favorite')){
          // console.log("no current fav")
          // console.log("hashedfav:" + hashedfav)
          store.set("favorite",{[hashedfav]:searchform})
        }else{
          // console.log(store.get('favorite'))
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
        if (true || (field && field!=="operation" && field!=="replacestring")){
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
          // console.log(response)
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
      // console.log(currentCursor)
      const promises = this.state.products.length
      let count = promises
      this.props.apolloClient.mutate({
        mutation: UPDATE_PRODUCTS,
        variables:{input:this.transformData(this.state.products[currentCursor.index].node, currentCursor.sco, currentCursor.count)}
      })
      .then(response=>{
        // console.log(response)
          this.setState({ loading:false, showtoast:true, toastcontent: `products change submitted.` })
      })
    }

    //handle data manipulation
    transformData = (data, scope, count)=>{
      const searchquery = this.getRegex(this.state.searchquery);
      let replacestring =  this.state.replacestring
      let result = {id:data.id}
      const { operation } = this.state
      // console.log(operation)
      if (operation === "delete"){
        replacestring = ""
      }
      if(scope!== undefined ){
        // console.log(scope, count)
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
      const operation = this.state.operation
      let insert = "", append = ""
      if (count !== undefined && operation === "insert"){
        insert = `<span style="color:orange">${this.state.replacestring}</span>`
      }else if (count !== undefined && operation === "append"){
        append = `<span style="color:orange">${this.state.replacestring}</span>`
      }
      const replacestring = this.state.replacestring !== "" ? this.state.replacestring : null
      let nth = -1
      return (
        <span dangerouslySetInnerHTML={{ __html : insert + text.replace(replace, function (x) {
              nth++
              switch (operation) {
                case "replace":
                  if (count !== undefined && count === nth){
                    // console.log(count, text)
                    return `<span style="background-color:#3297FD; color:white">${replacestring ? replacestring : x}</span>`;
                  }
                  return `<span style="background-color:yellow">${x}</span>`;
                case "delete":
                  if (count !== undefined && count === nth){
                    // console.log(count, text)
                    return `<span style="background-color:#3297FD; color:white; text-decoration: line-through;">${x}</span>`;
                  }
                  return `<span style="background-color:yellow">${x}</span>`;
                default:
                  if (count !== undefined && count === nth){
                    // console.log(count, text)
                    return `<span style="background-color:#3297FD; color:white">${x}</span>`;
                  }
                  return `<span style="background-color:yellow">${x}</span>`;
              }
            }) + append
          }} />
      )
    }

    HandleTagDisplay(node){
      return {...node, tags:node.tags.join("/n") }
    }

    FindTextByCursor(data, cursor){
      // console.log("find cursor")
      let counter = 0
      let result
      const replace = this.getRegex(this.state.searchquery);
      for (let index = 0; index < data.length; index++) {
        const node = this.HandleTagDisplay(data[index].node);
        for (let scoid = 0; scoid < this.state.scopes.length; scoid++) {
          const sco = this.state.scopes[scoid]
          let count = 0
          if (node[sco] && node[sco].match(replace) ){
            count = node[sco].match(replace).length
          }
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
      // console.log("convert data")
      if (!data || data.length < 1){
        this.setState({total: 0})
        return [[]]
      }
      const currentCursor = this.FindTextByCursor(data, cursor)
      // console.log(currentCursor)
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
    selectAll(){
      if(this.state.scopes.length === 6){ this.setState({scopes:[]})}
      else {this.setState({scopes:["title", "handle", "productType", "vendor", "tags", "description"]})}
    }
    handleTutorialChange = (type) => () => {
      console.log("tutorial change")
      const tutorial = this.state.tutorial
      switch (type) {
        case "next":
          if (tutorial === 8){
            this.setState({tutorial:-1})
            store.set("tutorial",-1)
          }else{
            this.setState({tutorial:tutorial + 1})
          }
          break;
        case "close":
          this.setState({tutorial:-1})
          store.set("tutorial",-1)
          break;
        case "previous":
            this.setState({tutorial:tutorial - 1})
            break;
        default:
          break;
      }
    }
    
    render() {
      const app = this.context;
      const {operation, searchquery, loading, replacestring, tutorial} = this.state

    return (
      <Page fullWidth>
      <Frame>
        <Welcome tutorial={tutorial} handleChange={this.handleTutorialChange}/>
        <div className="form-container">
          {(tutorial > 0) && <div className = "overlay"></div>}
          <div className="form">
            {(this.state.loading || this.state.fetching) && <Loading />}
            <div className={(tutorial === 1) ? "section focused" : "section"}>
            <small style={{color:"red"}}>These changes cannot be undone. We recommend backing up your catalog to CSV before applying edits.</small>

                <h3 className="select-all"><b>In fields: </b><Button onClick={this.selectAll.bind(this)}>select all</Button></h3>
                <div className="form-row field-list">
                    <Checkbox label="Title" checked={this.isScopeSelected('title')} onChange={this.handleScopeSelect('title')} />
                    <Checkbox label="Handle" checked={this.isScopeSelected('handle')} onChange={this.handleScopeSelect('handle')} />
                    <Checkbox label="Product types" checked={this.isScopeSelected('productType')} onChange={this.handleScopeSelect('productType')} />
                    <Checkbox label="Vendor" checked={this.isScopeSelected('vendor')} onChange={this.handleScopeSelect('vendor')} />
                    <Checkbox label="Tags" checked={this.isScopeSelected('tags')} onChange={this.handleScopeSelect('tags')} />
                    <Checkbox label="Description" checked={this.isScopeSelected('description')} onChange={this.handleScopeSelect('description')} />
                </div>
            </div>

            <div className={(tutorial === 2) ? "section focused" : "section"}>
              <h3><b>Search keywords: </b></h3>
              <div className="form-row find-text">
                <div className="form-input" >
                  <TextField placeholder="Find" value={searchquery} onChange={this.handleChange('searchquery')} />
                </div>
                <Button className="" onClick={this.previous.bind(this)}> <FontAwesomeIcon icon={faChevronUp} /> </Button>
                <Button className="" onClick={this.next.bind(this)}> <FontAwesomeIcon icon={faChevronDown} /> </Button>
                {(!this.state.total && searchquery !== "") && (<p style={{color:"red", fontWeight: "bold"}}>No result</p>)}
                {(this.state.total > 0 && searchquery !== "") && (<p style={{fontWeight: "bold"}}>{this.state.cursor + 1} of {this.state.total}</p>)}
              </div>
            </div>

            {/* <h3><b>Variant fields</b>(not in use): </h3>
            <div className="form-row">
                <Checkbox label="Price" disabled checked={this.isScopeSelected('price',1)} onChange={this.handleScopeSelect('price',1)} />
                <Checkbox label="SKU" disabled checked={this.isScopeSelected('sku',1)} onChange={this.handleScopeSelect('sku',1)} />
            </div> */}

            <div className={(tutorial > 2 && tutorial < 7) ? "section focused" : "section"}>
              <h3><b>Operation: </b></h3>
              <div className={(tutorial > 2 && tutorial < 7) ? "form-row circle"+tutorial: "form-row"}>
                <ChoiceList
                  choices={[
                    {label: 'Replace text', value: 'replace'},
                    {label: 'Insert in front', value: 'insert'},
                    {label: 'Append to end', value: 'append'},
                    {label: 'Remove text', value: 'delete'},
                  ]}
                  selected={operation}
                  onChange={this.handleChange('operation')}
                />
              </div>

              {(operation ) && <div className="form-row replace-text">
              {(operation ==="replace" || operation ==="insert" || operation ==="append") && <div className="form-input" >
                  <TextField placeholder={operation + " text"} disabled = {operation === "delete"} value={replacestring} onChange={this.handleChange('replacestring')} />
                </div>}
                <Button className="form-button" loading={loading} onClick={this.handleReplace.bind(this)}>{operation} </Button>
                <Button className="form-button" loading={loading} onClick={this.handleReplaceAll.bind(this)}>{operation} all</Button>
              </div>}
            </div>


            {/* <div className={(tutorial === 2 || tutorial === 7 || tutorial === 8) ? "section focused" : "section"}> */}
            <h3><b>Options: </b></h3>
            <div className="form-row option-list">
              <div className={(tutorial === 2 ) ? "focused-small" : ""}>
                <Checkbox label="Match case" checked={this.state.matchcase} onChange={this.handleChange('matchcase')} />
              </div>
              <div className={(tutorial === 7 || tutorial === 8) ? "focused-medium" : ""}>
                <a  className="form-item" onClick={this.toggleFavorite.bind(this)} >
                  <Icon source={this.state.saved ? StarFilledMinor : StarOutlineMinor} />
                  <p>{this.state.saved ? "Saved" : "Save to Favorite"}</p>
                </a>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="tutorial">
            <Tutorial tutorial={this.state.tutorial} handleChange={this.handleTutorialChange}/>
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