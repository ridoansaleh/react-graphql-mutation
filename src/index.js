import React from "react";
import { render } from "react-dom";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from "apollo-boost";
import { ApolloProvider, Mutation } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://172.31.6.228:9000/ui"
});

// const GET_TODOS = gql`
//   {
//     todos {
//       id
//       type
//     }
//   }
// `;

// const Todos = () => (
//   <Query query={GET_TODOS}>
//     {({ loading, error, data }) => {
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :(</p>;

//       return data.todos.map(({ id, type }) => {
//         let input;

//         return (
//           <div key={id}>
//             <p>{type}</p>
//             <form
//               onSubmit={e => {
//                 e.preventDefault();
//                 if (!input.value.trim()) {
//                   return;
//                 }

//                 input.value = "";
//               }}
//             >
//               <input 
//                 ref={node => {
//                   input = node;
//                 }}
//               />
//               <button type="submit">Update Todo</button>
//             </form>
//           </div>
//         );
//       });
//     }}
//   </Query>
// );

const ADD_PARTNER = gql`
    # input inputPartner {
    #     name: String
    #     nameSlug: String
    #     bankLogo: String
    #     phoneNumber: String
    #     companyProfile: String
    #     metaDescription: String
    #     metaTitle: String
    #     formSchema: String
    # }
    mutation LE($input: inputPartner!) { 
        le_addpartner(input: $input) {
            result {
                code
                message
                success
            }
            partnerID
        }
    }
`;

// mutation LE{ 
//     le_addpartner(input: {
//     name: "test"
//     nameSlug: "b"
//     bankLogo: "b"
//     phoneNumber: "b"
//     companyProfile: "b"
//     metaDescription: "b"
//     metaTitle: "c"
//     formSchema: "{\"title\": \"Step 2\",\"type\": \"object\",\"required\": [\"city\", \"job\"],\"properties\": {\"city\": {\"type\": \"string\"},\"job\": {\"type\": \"string\"},\"income\": {\"type\": \"string\"}}}"
//   }){
//     result {
//       code
//       message
//       success
//     }
//     partnerID
//   }
// }

class AddTodo extends React.Component {
    state = {
        name: '',
        nameSlug: '',
        bankLogo: null,
        phoneNumber: '',
        companyProfile: '',
        metaDescription: '',
        metaTitle: '',
        formSchema: ''
    }

    handleValueChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render () {
        return (
            <Mutation mutation={ADD_PARTNER}>
                {(le_addpartner, { data }) => (
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            console.log('STATE : ',{...this.state})
                            le_addpartner({ 
                                variables: { 
                                        input: {...this.state}
                                } 
                            })
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" onChange={(e) => this.handleValueChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nameSlug">Name Slug</label>
                            <input type="text" className="form-control" id="nameSlug" onChange={(e) => this.handleValueChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bankLogo">Bank Logo</label>
                            <input type="text" className="form-control" id="bankLogo" onChange={(e) => this.handleValueChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" className="form-control" id="phoneNumber" onChange={(e) => this.handleValueChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="companyProfile">Company Profile</label>
                            <textarea className="form-control" id="companyProfile" rows="3" onChange={(e) => this.handleValueChange(e)}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="metaDescription">Meta Description</label>
                            <textarea className="form-control" id="metaDescription" rows="3" onChange={(e) => this.handleValueChange(e)}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="metaTitle">Meta Title</label>
                            <textarea className="form-control" id="metaTitle" rows="3" onChange={(e) => this.handleValueChange(e)}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formSchema">Form Schema</label>
                            <textarea className="form-control" id="formSchema" rows="4" onChange={(e) => this.handleValueChange(e)}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Partner</button>
                    </form>
                )}
            </Mutation>
        )
    }
}

const App = () => (
  <ApolloProvider client={client}>
    <div style={{ marginTop: '50px' }}>
      <h2>
          GraphQL Mutation Partner{' '}
          <span aria-labelledby='jsx-a11y/accessible-emoji' role='img'>🚀</span>
      </h2>
      <AddTodo />
      {/* <Todos /> */}
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
registerServiceWorker();
