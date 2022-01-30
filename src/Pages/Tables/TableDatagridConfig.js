import { Avatar, Grid, Tooltip,  } from "@mui/material";
import {withStyles } from '@material-ui/core/styles';
import React from 'react';
import HoverCard from "./HoverCard";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
   
  },
}))(Tooltip);

export const racersTableColumns = [
  {
    field: 'position',
    headerName: 'Place',
    editable: false,
    flex: 1,

  },
  {
    field: 'name',
    headerName: 'Driver',
    editable: false,
    minWidth: 250,
    renderCell: (params) =>
      <Grid container justifyContent={'flex-start'} alignItems={'center'}>
     {/*    <HtmlTooltip
         title={
          <HoverCard
          params={params}
          />
        }
        > */}
        <Avatar alt={params.row.name} src={params.row.driverImage} style={{ marginRight: '15px' }}></Avatar>
      {/*   </HtmlTooltip> */}
        {params.row.name}
      </Grid>
  },

  

  {
    field: 'team',
    headerName: 'Team',
    editable: false,
    minWidth: 250,
    renderCell: (params) => <Grid container justifyContent={'flex-start'} alignItems={'center'}><Avatar className="team-avatar" alt={params.row.team} src={params.row.teamLogo} style={{ marginRight: '15px' }} ></Avatar>{params.row.team}</Grid>
  },
  {
    field: 'points',
    headerName: 'Point',
    type: 'number',
    editable: false,
    flex: 1
  },
];

export const teamsTableColumns = [
  {
    field: 'position',
    headerName: 'Place',
    editable: false,
    flex: 1,

  },
  {
    field: 'name',
    headerName: 'Team',
    editable: false,
    minWidth: 250,
    renderCell: (params) => <Grid container justifyContent={'flex-start'} alignItems={'center'}><Avatar className="team-avatar" alt={params.row.name} src={params.row.driverImage} style={{ marginRight: '15px' }}></Avatar>{params.row.name}</Grid>

  },
  {
    field: 'points',
    headerName: 'Point',
    type: 'number',
    editable: false,
    flex: 1
  },
];

export const racesTableColumns = [
  {
    field: '1st-parctice',
    headerName: "1st Practice",
    editable: false,
    flex: 1,

  },
  {
    field: '2nd-parctice',
    headerName: "2nd Practice",
    editable: false,
    flex: 1,

  },
  {
    field: '3rd-parctice',
    headerName: "3rd Practice",
    editable: false,
    flex: 1,

  },
];