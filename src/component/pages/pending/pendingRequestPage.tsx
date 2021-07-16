import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import clsx from 'clsx';

import { DataGrid, getThemePaletteMode } from '@material-ui/data-grid';
import { Button, createMuiTheme, darken, lighten, makeStyles } from '@material-ui/core';
import ReimbursementRequest from "../../../models/request";
import { currentUser, sendReimbursementRequest } from "../../../remote/grubdash-backend/trms.api";
import ErrorBoundary from "../errorBoundarPage";
import trmsClient from "../../../remote/grubdash-backend/trms.client";

const PendingRequestPage = () => {
    let history = useHistory();

    const [requests, setRequests] = useState<ReimbursementRequest[]>([]);
    const [selectedRows, setSelection] = useState<Object[]>([]);

    const getStatusTitle = (): string => {
        if (currentUser?.role === 'Benco') return 'bencoApproval';
        else if (currentUser?.role === 'Supervisor') return 'supervisorApproval';
        else return 'managerApproval'

    }

    const defaultTheme = createMuiTheme();
    const useStyles = makeStyles(
        (theme) => {
            const getBackgroundColor = (color: any) =>
                getThemePaletteMode(theme.palette) === 'dark'
                    ? darken(color, 0.6)
                    : lighten(color, 0.6);

            const getHoverBackgroundColor = (color: any) =>
                getThemePaletteMode(theme.palette) === 'dark'
                    ? darken(color, 0.5)
                    : lighten(color, 0.5);

            return {
                root: {
                    '& .super-app-theme--Urgent': {
                        backgroundColor: getBackgroundColor(theme.palette.error.main),
                        '&:hover': {
                            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
                        },
                    },
                },
            };
        },
        { defaultTheme },
    );
    const classes = useStyles();

    const isUrgent = (currentId: string): string => {
        const request = requests.filter(request => request.id === currentId)[0]
        if(request.bencoApproval === 'Approved') {
            return ""
        }
        const today = new Date();
        const startDate = new Date(request.startDate);
       
        const diff = startDate.getTime() - today.getTime()
        return diff < 14 * 1000 * 3600 * 24? 'Urgent' : 'Wapi';
    }

    const columns = [

        {
            field: 'id',
            headerName: 'Id',
            type: 'number',
            width: 150,
            cellClassName: (params: any) =>
                clsx('super-app', {
                    urgent: isUrgent(params.value),
                }),

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
            field: getStatusTitle(),
            headerName: 'Status',
            sortable: false,
            width: 160,

        },
    ];

    useEffect(() => {
        if (requests.length === 0) {
            fetchPendingRequests()
        }
    }, []);

    const fetchPendingRequests = async () => {

        const userId = currentUser?.id;
        const { data: request } = await trmsClient.get('/pending/' + userId);

        setRequests(request);
    }

    const approveRequests = async () => {

        requests.filter((x: { id: string; }) => selectedRows.includes(x.id)).forEach((request) => {
            if (currentUser?.role === 'Benco') {
                request.bencoApproval = 'Approved'
            } else if (currentUser?.role === 'Supervisor') {
                request.supervisorApproval = 'Approved'
            } else {
                request.managerApproval = 'Approved'
            }
            sendReimbursementRequest(
                request.beneficiaryId,
                request.supervisorId, request.managerId,
                request.eventName, request.eventType, request.startDate, request.endDate, request.cost, request.bencoApproval,
                request.managerApproval, request.supervisorApproval, request.id)
        });
        fetchPendingRequests()
    }

    const rejectRequests = async () => {

        requests.filter((x: { id: string; }) => selectedRows.includes(x.id)).forEach((request) => {
            if (currentUser?.role === 'Benco') {
                request.bencoApproval = 'Denied'
            } else if (currentUser?.role === 'Supervisor') {
                request.supervisorApproval = 'Denied'
            } else {
                request.managerApproval = 'Denied'
            }
            sendReimbursementRequest(
                request.beneficiaryId,
                request.supervisorId, request.managerId,
                request.eventName, request.eventType, request.startDate, request.endDate, request.cost, request.bencoApproval,
                request.managerApproval, request.supervisorApproval, request.id)
        });
        fetchPendingRequests()
    }

    return (
        <ErrorBoundary>
            <div 
                style={{
                    height: 600,
                }} className={classes.root}>
                <h3>Pending Requests</h3>
                <DataGrid
                    rows={requests}
                    columns={columns}
                    pageSize={10}
                    disableMultipleSelection
                    checkboxSelection={true}
                    disableSelectionOnClick={false}
                    onSelectionModelChange={(newSelection) => {
                        setSelection(newSelection.selectionModel);
                        console.log(newSelection.selectionModel)
                    }}
                    getRowClassName={(params: any) =>
                        `super-app-theme--${isUrgent(params.id)}`
                    }
                />
                <br />
                <Button onClick={approveRequests} style={{
                    margin: 10,
                }} variant="contained" color="primary"
                    disabled={selectedRows.length === 0}>
                    Approve
                </Button>

                <Button onClick={rejectRequests} variant="contained" color="secondary"
                    disabled={selectedRows.length === 0}>
                    Reject
                </Button>

            </div>
        </ErrorBoundary>
    );
}

export default PendingRequestPage;