import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as homeActions from "../../redux/actions/home-actions";
import { Table } from 'antd';
const columns = [
  {
    title: 'First Name',
    dataIndex: 'name.first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'name.last_name',
  },
  {
    title: 'Middle Name',
    dataIndex: 'name.middle_name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: (text, user) => (
      <span>
        {user.address.line1 + " " + user.address.line1+ "," + user.address.zip_code+ "," + user.address.city+ "," + user.address.state+ "," + user.address.country }
      </span>
    )
  }
  ,
  {
    title: 'Friends',
    dataIndex: 'friends',
    render: (text, user) => (
      <span>
        {user.friends.map(function(friend, index){
          return (friend.name.first_name)
        })}
      </span>
    )
  }
];
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRowKeys: []
    }
  }
  componentDidMount(){
    this.initialize();
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  async initialize(){
    await this.props.getUserList();
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      selectedRowKeys: []
    });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className="form-wraper">
       <div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} onChange={this.handleChange} columns={columns} dataSource={this.props.userList} />
      </div>
      </div>
    );
  }
}

Home.propTypes = {
  getUserList:PropTypes.func,
  userList:PropTypes.array
};
function mapStateToProps(state) {
  return {
    ...state.home,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
     ...homeActions,
  }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Home));

