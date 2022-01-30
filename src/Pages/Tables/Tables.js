import { FormControl, Grid, Paper, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiOptions } from "../../Helpers/AxiosHelpers";
import { racersTableColumns, racesTableColumns, teamsTableColumns } from "./TableDatagridConfig";
import { makeStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { actualYear, TABLE_TYPE } from "../../Helpers/globalFunctions";
import { ApiEndPoints } from "../../Helpers/ApiEndPoints";

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        maxWidth: 750,
    },
    racersTableWrapper: {
    },
    menuWrapper: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    dataGrid: {
        '& .team-avatar': {
            '& img': {
                objectFit: 'contain'
            }
        }
    }
}));

const Tables = () => {
    const classes = useStyles();
    const [selectedMenuItem, setSelectedMenuItem] = useState(TABLE_TYPE.DRIVERS_TABLE);
    const [response, setResponse] = useState([]);
    const [teamsResponse, setTeamsResponse] = useState([]);
    const [racesRankings, setRacesRankings] = useState([]);
    const [year, setYear] = useState(2021);
    const [urlDetail, setUrlDetail] = useState(ApiEndPoints.DRIVERS_RANKINGS);
    const method = "GET";
    const [params, setParams] = useState({ season: 2021 });
    const options = apiOptions(urlDetail, method, params);
    const seasons = [
        2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021
    ];


    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };


    useEffect(
        () => {
            axios.request(options).then(function (response) {
                if (urlDetail === ApiEndPoints.DRIVERS_RANKINGS) {
                    setResponse(response);
                }
                if (urlDetail === ApiEndPoints.TEAMS_RANKINGS) {
                    setTeamsResponse(response);
                }
                if (urlDetail === ApiEndPoints.RACES_RANKINGS) {
                    setRacesRankings(response);
                }
            }).catch(function (error) {
                console.error(error);
            });

        }, [year, urlDetail]);

    const driversMenuClickHanlder = () => {
        setSelectedMenuItem(TABLE_TYPE.DRIVERS_TABLE);
        setUrlDetail(ApiEndPoints.DRIVERS_RANKINGS);
        setParams({ season: year });
    };

    const teamsMenuClickHanlder = () => {
        setSelectedMenuItem(TABLE_TYPE.TEAMS_TABLE);
        setUrlDetail(ApiEndPoints.TEAMS_RANKINGS);
        setParams({ season: year });

    };

    const racesMenuClickHandler = () => {
        setSelectedMenuItem(TABLE_TYPE.RACES_TABLE);
        setUrlDetail(ApiEndPoints.RACES_RANKINGS);
        setParams(null);
    };

    console.log(params)
    const driversRows = response?.data?.response.map((data) => {
        return {
            id: data.driver.id,
            position: data.position,
            driverImage: data.driver.image,
            name: data.driver.name,
            points: data.points,
            team: data.team.name,
            teamLogo: data.team.logo
        };

    });

    const teamsRows = teamsResponse?.data?.response.map((data) => {
        return {
            id: data.team.id,
            position: data.position,
            driverImage: data.team.logo,
            name: data.team.name,
            points: data.points,
            team: data.team.name,
        };

    });

    const racesRows = racesRankings?.data?.response.map((data) => {
        console.log(data);
        return {
            id:data.id,
            "1st-parctice":data.id,
            "2nd-practice":data.id
        }
    });
    console.log(racesRows)

    const generateRowBySelectedMenu = () => {
        if (selectedMenuItem === TABLE_TYPE.DRIVERS_TABLE) {
            return driversRows;
        }
        if (selectedMenuItem === TABLE_TYPE.TEAMS_TABLE) {
            return teamsRows;
        }
    };

    const getSelected = () => {
        const selected = {
            driversTable: false,
            temasTable: false,
            racesTable: false
        }
        switch (selectedMenuItem) {
            case TABLE_TYPE.DRIVERS_TABLE: selected.driversTable = true;
                break;
            case TABLE_TYPE.TEAMS_TABLE: selected.temasTable = true;
                break;
            case TABLE_TYPE.RACES_TABLE: selected.racesTable = true;
                break;
        }
        return selected;
    };

    const getColumns = () => {
        let columns = TABLE_TYPE.DRIVERS_TABLE;
        switch (selectedMenuItem) {
            case TABLE_TYPE.DRIVERS_TABLE: columns = racersTableColumns;
                break;
            case TABLE_TYPE.TEAMS_TABLE: columns = teamsTableColumns;
                break;
            case TABLE_TYPE.RACES_TABLE: columns = racesTableColumns;
                break;
        }
        return columns;
    };

    console.log(racesRankings);

    return (
        <Grid container justifyContent={'center'}>
            <Grid component={Paper} container justifyContent={'center'} className={classes.pageContainer}>
                <Grid container component={Paper} >
                    <MenuList className={classes.menuWrapper}>
                        <MenuItem>
                            <FormControl className={classes.formControl}>
                                <Select
                                    id="year-select"
                                    value={year}
                                    onChange={handleChangeYear}
                                >
                                    {seasons.map((season, index) => (
                                        <MenuItem key={index} value={season}>{season}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>

                        </MenuItem>
                        <MenuItem onClick={driversMenuClickHanlder} selected={getSelected().driversTable}>
                            <ListItemIcon>
                                <Icon>sports_motorsports</Icon>
                            </ListItemIcon>
                            <Typography variant="inherit">Drivers</Typography>
                        </MenuItem>
                        <MenuItem onClick={teamsMenuClickHanlder} selected={getSelected().temasTable}>
                            <ListItemIcon>
                                <Icon>groups</Icon>
                            </ListItemIcon>
                            <Typography variant="inherit">Teams</Typography>
                        </MenuItem>
                        <MenuItem onClick={racesMenuClickHandler} selected={getSelected().racesTable}>
                            <ListItemIcon>
                                {/* <Icon>sports_motorsports</Icon> */}
                            </ListItemIcon>
                            <Typography variant="inherit">Races</Typography>
                        </MenuItem>
                    </MenuList>
                </Grid>
                {((selectedMenuItem === TABLE_TYPE.DRIVERS_TABLE && driversRows) || (selectedMenuItem === TABLE_TYPE.TEAMS_TABLE && teamsRows)) &&
                    <Grid container className={classes.racersTableWrapper}>
                        <DataGrid
                            rows={generateRowBySelectedMenu()}
                            columns={getColumns()}
                            hideFooterPagination
                            autoHeight
                            disableSelectionOnClick
                            className={classes.dataGrid}
                        />
                    </Grid>
                }
            </Grid>
        </Grid >
    );
};

export default Tables;