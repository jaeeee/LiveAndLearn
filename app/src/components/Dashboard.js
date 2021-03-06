import React, { Component } from 'react'
import fire, { db } from "../config/firebase";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBListGroupItem,
  MDBBadge
} from "mdbreact";

export class Dashboard extends Component {
         constructor(props) {
           super(props);
           //  this.componentDidMount();
           //  this.callAPI = this.callAPI.bind(this);
           this.logout = this.logout.bind(this);
           this.handleChange = this.handleChange.bind(this);
           this.submitQuestion = this.submitQuestion.bind(this);
           this.componentDidMount = this.componentDidMount.bind(this);
          //  this.componentDidUpdate = this.componentDidUpdate.bind(this);

           this.state = {
             question: "",
             questions: [],
             upvotes: []
           };
         }

         handleChange(e) {
           console.log(e.target.name);
           this.setState({ [e.target.name]: e.target.value });
           console.log(e.target.value);
           //  }
           console.log(this.state.name);
                    //  this.forceUpdate();
         }

         submitQuestion(e) {
           const uuidv4 = require("uuid/v4");
           var blah = uuidv4();
           fire
             .firestore()
             .doc(`/questions/${blah}`)
             .set({
               uid: blah,
               question: this.state.question,
               upvotes: 0
             });
              const qs = [];
              db.collection("questions")
                .get()
                .then(snapshot => {
                  snapshot.forEach(doc => {
                    qs.push(doc.data());
                    this.setState({ questions: qs });
                    //  this.state.questions = qs;
                  });
                });
         }

         componentDidMount() {
           const qs = [];
           db.collection("questions")
             .get()
             .then(snapshot => {
               snapshot.forEach(doc => {
                 qs.push(doc.data());
                       this.setState({ questions: qs });
                //  this.state.questions = qs;
               });
             });
         }

    //      componentDidUpdate() {
    // const qs = [];
    // db.collection("questions")
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       //  qs[doc.key] = doc.data();
    //       qs.push(doc.data());
    //             this.setState({ questions: qs });
    //       // this.state.questions = qs;
    //     });
    //   });
      // this.forceUpdate();
        //  }

         logout() {
           fire.auth().signOut();
         }

         handleClick = (data, e) => {
           data.upvotes++;
        //    var username = fire.auth().currentUser.email;
           db.collection("questions")
             .doc(data.uid)
             .set({
               question: data.question,
               upvotes: data.upvotes,
               uid: data.uid
               //  usersWhoUpvoted: data.usersWhoUpvoted.push(fire.auth().currentUser.email);
             });
           const qs = [];
           db.collection("questions")
             .get()
             .then(snapshot => {
               snapshot.forEach(doc => {
                 //  qs[doc.key] = doc.data();
                 qs.push(doc.data());
                 this.setState({questions : qs});
                //  this.state.questions = qs;
               });
             });
             this.forceUpdate();
         };
         //  };
         render() {
           return (
             <div
               style={{
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 height: "100vh"
               }}
             >
               <MDBContainer>
                 <MDBCard style={{ padding: "20px" }}>
                   <center>
                     <h1>Have something to share?</h1>
                     <h3>
                       Ask us a thought provoking question.
                     </h3>{" "}
                     {this.state.questions.map((d, idx) => (
                       <MDBListGroupItem
                         className="d-flex justify-content-between align-items-center"
                         key={idx}
                       >
                         {d.question}{" "}
                         <MDBIcon
                           value={d}
                           onClick={this.handleClick.bind(this, d)}
                           icon="thumbs-up"
                         >
                           {" "}
                           {d.upvotes}{" "}
                         </MDBIcon>
                         {/* <MDBBadge color="green" pill>
                             3
                           </MDBBadge>{" "} */}
                       </MDBListGroupItem>
                     ))}
                     {/* </ul> */}
                     {/* </ol> */}
                     <MDBInput
                       value={this.state.question}
                       onChange={this.handleChange}
                       label="Ask a question"
                       //  icon="envelope"
                       //  group
                       name="question"
                       type="text"
                       //  validate
                       error="wrong"
                       success="right"
                       //   disabled
                     />
                     <MDBBtn
                       color="green"
                       type="button"
                       onClick={this.submitQuestion}
                     >
                       Submit
                     </MDBBtn>
                   </center>
                 </MDBCard>
               </MDBContainer>
             </div>
           );
         }
       }

export default Dashboard
