import { EmptyState, Layout, Page, Card, ResourceList } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import FavoriteList from '../components/FavoriteList.js'
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Favorite extends React.Component {
    state = { open: false };
    render() {
      // const emptyState = !store.get('ids');
      const emptyState = false;
      console.log(this.props)
      return (
    <Page>
        {emptyState ? (
          <Layout>
            <EmptyState
              heading="You dont have favorite yet"
              action={{
                content: 'Go to main page',
                onAction: () => this.setState({ open: true }),
              }}
              image={img}
            >
              <p>Create Find and Replace and save it to favorite</p>
            </EmptyState>
          </Layout>
        ) : (
            <FavoriteList apolloClient={this.props.apolloClient}/>
        )}
    </Page>
    ); 
    }
    handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false })
    store.set('ids', idsFromResources);
  };
}

export default Favorite;