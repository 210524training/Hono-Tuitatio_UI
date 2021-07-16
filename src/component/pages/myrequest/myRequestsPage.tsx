import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import ReimbursementRequest from "../../../models/request";
import React from "react";
import { currentUser } from "../../../remote/grubdash-backend/trms.api";
import trmsClient from "../../../remote/grubdash-backend/trms.client";

const MyRequestsPage = () => {
    let history = useHistory();

    const [requests, setRequests] = useState<ReimbursementRequest[]>([]);
    const [balance, setBalance] = useState<number>();
    

    const columns = [

        {
            field: 'id',
            headerName: 'Id',
            type: 'number',
            width: 150,

        },
        {
            field: 'supervisorId',
            headerName: 'Supervisor',
            type: 'number',
            width: 150,
        },
        {
            field: 'managerId',
            headerName: 'Manager',
            type: 'number',
            width: 110,
        },
        {
            field: 'eventName',
            headerName: 'Event',
            width: 150,
        },
        {
            field: 'eventType',
            headerName: 'Type',
            type: 'string',
            width: 150,
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            type: 'string',
            width: 150,
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            type: 'string',
            width: 150,
        },
        {
            field: 'cost',
            headerName: 'Amount',
            type: 'string',
            width: 110,
        },
        {
            field: 'bencoApproval',
            headerName: 'Status',
            sortable: false,
            width: 160,
        },
        {
            field: 'Upload',
            headerName: 'Proof',
            width: 150,
            renderCell: () => (
              <strong>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: 16 }}
                >
                  Upload
                </Button>
              </strong>
            ),
          },
    ];

    useEffect(() => {
        if (requests.length === 0) {
            fetchPendingRequests()
        }
    }, []);

    const fetchPendingRequests = async () => {

        const userId = currentUser?.id;
        const { data: request } = await trmsClient.get('/my_request/' + userId);
        var balanceCurr = 1000
        for(var curr of requests) {
             balanceCurr -= curr.cost
        }
       
        setBalance(balanceCurr)
        setRequests(request);
    }

    const makeRequest = () =>{
        history.push('/request')
    }


    return (
        <div className='block'
            style={{
            height: 300
            }}
            >
            <h3>My Requests</h3>
            <h3>Balance: {balance}</h3>
            <DataGrid
                rows={requests}
                columns={columns}
                pageSize={10}
                disableMultipleSelection
                checkboxSelection 
                disableSelectionOnClick
            />
            <br />
            <Button variant="contained" color="primary" onClick={makeRequest}>
                New Request
            </Button>
            <br />

        </div>

    );
}

export default MyRequestsPage;