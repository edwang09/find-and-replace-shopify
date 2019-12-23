import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Card,
    ResourceList,
    Stack,
    TextStyle,
    TextField,
    Thumbnail,
    DataTable,
    Button,
    Checkbox,
    Icon,
    Select
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
import{ UPDATE_PRODUCTS, LIST_PRODUCTS, constructSearchProduct }from "./graphql.js"

class ResourceListWithProducts extends React.Component {
    static contextType = Context;
    state = {
        fetching:true,
        searchquery: "",
        replacestring:"",
        matchcase:false,
        saved: false,
        scopes:[],
        scopesV:[],
        products:[],
        allproducts:[]
    }
    componentDidMount(){
      this.fetchQuery()
    }
    getRegexCase(){return this.state.matchcase ? "g" : "gi"}

    fetchQuery(){
      console.log("fetch")
      this.setState({fetching:true})
      this.props.apolloClient.query({query: LIST_PRODUCTS}).then(response=>this.setState({allproducts:response.data.products.edges,fetching:false},()=>{
        this.filterQuery()
      }))
    }

    filterQuery(){
      console.log("filter")
      if(this.state.searchquery!=="" && (this.state.scopes.length + this.state.scopesV.length !== 0) && (this.state.allproducts !== 0) ){
        const currentproducts = this.state.allproducts.filter(prod=>{
          const regx = new RegExp(this.state.searchquery, this.getRegexCase());
          return this.state.scopes.some(sco=>{
            if(sco==="tags"){
              return (prod.node[sco].join("/n").search(regx)>-1)
            }
            return (prod.node[sco].search(regx)>-1)
          })
        })
        console.log(currentproducts)
        this.setState({products: currentproducts})
      }else{
        this.setState({products:[]})
      }
    }

    getHeader(){
      return ["title","handle",...this.state.scopes.filter(sco=>(sco!=="title" && sco!=="handle"))]
    }
    getHeaderType(){
      return Array(this.state.scopes.length).fill('text')
    }

    isScopeSelected(scope,isVariant){
      if(isVariant){
        return (this.state.scopesV.findIndex(sco=>sco===scope)>-1)
      }
      return (this.state.scopes.findIndex(sco=>sco===scope)>-1)
    }

    handleScopeSelect=(scope,isVariant)=>()=>{
      const scopetype = isVariant ? "scopesV" : "scopes"
      const scopes = this.state[scopetype]
      const selected = (this.state[scopetype].findIndex(sco=>sco===scope)>-1)
      if (selected){
        this.setState({[scopetype]: scopes.filter(sco=>sco!==scope)},()=>{
          this.filterQuery()
        })
      }else{
        this.setState({[scopetype]: [...scopes,scope]},()=>{
          this.filterQuery()
        })
      }
    }

    toggleFavorite = () => {
      console.log("toggle fav")
      const favorite = store.get('favorite')
      const searchform = _.pick(this.state, ['searchquery', 'replacestring', 'matchcase','scopes'])
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
      this.setState({ [field]: value }, ()=>{
        const searchform = _.pick(this.state, ['searchquery', 'replacestring', 'matchcase','scopes'])
        const hashedfav = Object.keys(searchform).sort().map(x => searchform[x].toString()).join(";");
        const saved = store.get('favorite') && store.get('favorite')[hashedfav]
        this.setState({ saved })
        this.filterQuery()
      })
    };

    handleReplace = () => {
      if(!this.state.products || this.state.products.length<1){
        return 
      }
      let promises=this.state.products.length
      this.state.products.map((item,idx)=>{
        this.props.apolloClient.mutate({
          mutation: UPDATE_PRODUCTS,
          variables:{input:this.transformData(item.node)}
        })
        .then(response=>{
          console.log(response)
          promises -=1
          if(promises===0){
            this.fetchQuery()
          }
        })
      })
    }

    transformData = (data)=>{
      const searchquery = new RegExp(this.state.searchquery, this.getRegexCase());
      let result = {id:data.id}
      this.state.scopes.map(sco=>{
        if(sco==="tags"){
          result[sco] = data[sco].map(tag=>tag.replace(searchquery, this.state.replacestring))
        }else if(sco==="description"){
          result["descriptionHtml"] = data[sco].replace(searchquery, this.state.replacestring)
        }else{
          result[sco] = data[sco].replace(searchquery, this.state.replacestring)
        }
      })
      console.log(result)
      return result
    }

    InjectHighlight = (text) => {
      if (!text){
        return "NA"
      }
      const replace = new RegExp(this.state.searchquery, this.getRegexCase());
      return (
        <span
          dangerouslySetInnerHTML={{
            __html : text.replace(replace, function (x) {
              return `<span style="background-color:yellow">${x}</span>`;
            })
          }} />
      )
    }

    ConvertDatatoTable = (data) =>{
      if (!data || data.length < 1){
        return [[]]
      }
      return data.map(item=>{
        const node = item.node
        return this.getHeader().map(sco=>{
          if(sco==="tags"){
            if (this.state.scopes.findIndex(scope=>sco===scope)==-1){
              return node[sco].join("/n")
            }
            return this.InjectHighlight(node[sco].join("/n"))
          }
          if (this.state.scopes.findIndex(scope=>sco===scope)==-1){
            return node[sco]
          }
          return this.InjectHighlight(node[sco])
        })
      })
    }
    
    render() {
      const app = this.context;
      // const redirectToProduct = () => {
      //   const redirect = Redirect.create(app);
      //   redirect.dispatch(
      //     Redirect.Action.APP,
      //     '/edit-products',
      //   );
      // };
      const selectoptions = [
        {label:"products",value:"products"},
        {label:"products",value:"products"},
        {label:"products",value:"products"},
      ]
    return (
      <div>
        <div className="form-container">
          
          <div className="form-row">
            <div className="form-input" >
              <TextField placeholder="Find" value={this.state.searchquery} onChange={this.handleChange('searchquery')} />
            </div>
          </div>
          
          <h3>Include fields: </h3>
          <div className="form-row">
              <Checkbox label="Title" checked={this.isScopeSelected('title')} onChange={this.handleScopeSelect('title')} />
              <Checkbox label="Handle" checked={this.isScopeSelected('handle')} onChange={this.handleScopeSelect('handle')} />
              <Checkbox label="Product types" checked={this.isScopeSelected('productType')} onChange={this.handleScopeSelect('productType')} />
              <Checkbox label="Vendor" checked={this.isScopeSelected('vendor')} onChange={this.handleScopeSelect('vendor')} />
              <Checkbox label="Tags" checked={this.isScopeSelected('tags')} onChange={this.handleScopeSelect('tags')} />
              <Checkbox label="Description" checked={this.isScopeSelected('description')} onChange={this.handleScopeSelect('description')} />
          </div>

          <h3>Variant fields(not in use): </h3>
          <div className="form-row">
              <Checkbox label="Price" checked={this.isScopeSelected('price',true)} onChange={this.handleScopeSelect('price',true)} />
              <Checkbox label="SKU" checked={this.isScopeSelected('sku',true)} onChange={this.handleScopeSelect('sku',true)} />
          </div>

          <div className="form-row">
            <div className="form-input" >
              <TextField placeholder="Replace with"  value={this.state.replacestring} onChange={this.handleChange('replacestring')} />
            </div>
            <Button className="form-button" onClick={this.handleReplace.bind(this)}>Replace </Button>
            <Button className="form-button" onClick={this.handleReplace.bind(this)}>Replace all</Button>
          </div>


          <div className="form-row">
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
            rows={this.ConvertDatatoTable(this.state.products)}
          />
        </Card>

      </div>
    );
  }
}

 export default ResourceListWithProducts;