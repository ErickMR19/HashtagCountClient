import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './HashtagCountList.css';
import $ from 'jquery'; 

var allItems = []
allItems.push("Buy ingredients for Crock Pot");
allItems.push("Pick up chair at IKEA");
allItems.push("Go see mom");

class HashtagCountList extends React.Component {
  constructor(props){
    super(props);
    this.state = {items: []};
    this.addEvent = this.addEvent.bind(this);
  }
  getInitialState() {
    return { allItems };
  }
  render() {
    const items = this.state.items.map((item, i) => (
      <div className="item" key={item.hashtag}>
        <span>#{item.hashtag}</span>
        <span>{item.number}</span>
      </div>
    ));
    return(
      <div>
        <div className="table-hashtags pure-table pure-table-horizontal">
          <div className="div-tbody">
            <div className="div-tr">
              <span>Hashtag</span>
              <span>Número de Tweets</span>
            </div>
          </div>
          <div>
          <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={800}
          transitionLeaveTimeout={400}
          component="div">
          {items}
        </ReactCSSTransitionGroup>
          </div>
        </div>
        <p><HashtagNewQuery addEvent={this.addEvent} /></p>
      </div>
    );
  }
  addEvent(newItem){
    const newItems = this.state.items.concat([
      newItem
    ]);
    newItems.sort(function(a,b){
      return a.number - b.number;
    });
    this.setState({items: newItems});
  }
}


class HashtagNewQuery extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.hashtag).focus();
  }
  render(){
    return (<form className="pure-form" onSubmit={this.onSubmit}>
      <input ref="hashtag" type="text" placeholder="Hashtag" />
      <button className="pure-button pure-button-primary" type="submit">Consultar</button>
    </form>);
  }
  onSubmit(event){    
    event.preventDefault();
    var input = ReactDOM.findDOMNode(this.refs.hashtag)
   
    var hashtag = input.value;
    input.value = '';
    $.ajax({
      url: 'http://hashtagcount.erickmadrigal.me/tweets/' + hashtag,
      type: 'GET',
      dataType: 'JSON',
      success: (data) => {
        this.props.addEvent({ hashtag, number: data.number_tweets });
        console.log({ hashtag, number: data.number_tweets });
      }
    });
  }
}

export default HashtagCountList;