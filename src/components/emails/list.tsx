import React, { useState, Dispatch, useEffect } from 'react';
import { Table, Button } from 'antd';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {includes} from 'lodash';
import './list.css';
import {ParamTypes} from '../../types';
import {emailListColumns, emailListFirstColumn} from './config';
import {deleteEmail} from '../../store/emails/actions';
import {ActionTypes} from '../../store/emails/types';

function EmailList({emails, deleteEmail}:any) {
    const rhist:any = useHistory();
    let { emailAction } = useParams<ParamTypes>();
    const  firstColumn  = emailListFirstColumn[emailAction] || {};
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (selectedRowKeys:any) => {
      setSelectedRowKeys(selectedRowKeys);
    }

    const deleteAnEmail = () => {
      const emailList = emails
      .filter((email:any, index:number) => includes(selectedRowKeys, index))
      .map(({emailUuid}:any) => emailUuid)
      deleteEmail(emailList);
      setSelectedRowKeys([]);
    }
    
    


    return (
      <>
        <Button onClick={() => deleteAnEmail()} className='delete-action' disabled={!selectedRowKeys.length}>Delete</Button>
        <Table rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        rowClassName = {({readClass}, index) => (readClass || "")}
        rowKey={({index}) => index}
        onRow={({emailUuid}, rowIndex) => {
          return {
            onClick: event => rhist.push(`/dashboard/${emailAction}/view/${emailUuid}`)
          }
        }}
        columns={[firstColumn, ...emailListColumns]} dataSource={emails} />
      </>
    );
}



const mapDispatchToProps = (dispatch:Dispatch<ActionTypes>) => {
  return {
    deleteEmail : (emailUuids:string[]) => dispatch(deleteEmail(emailUuids)),
  };
};

const mapStateToProps = ({email, auth}:any) => {
  return {
    currentUser : auth.currentUser,
    emails : email.emails,
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailList);
