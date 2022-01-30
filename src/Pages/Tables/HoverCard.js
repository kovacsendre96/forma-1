import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { ApiEndPoints } from '../../Helpers/ApiEndPoints';
import { apiOptions } from '../../Helpers/AxiosHelpers';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    '& .MuiCardMedia-img': {
      objectFit: 'contain'
    }
  },
  media: {
    height: 150,
  },
});

const HoverCard = ({ params }) => {
  const urlDetail = ApiEndPoints.DRIVER;
  const method = 'GET';
  const param = {search : params.row.name};
  const options = apiOptions(urlDetail, method, param);
  const actualDriver = useState(params.row.name);
  const [response, setResponse] = useState();

  useEffect(
    () => {
      axios.request(options).then(function (response) {
        setResponse(response);
      }).catch(function (error) {
        console.error(error);
      });

    }, [actualDriver]);

    console.log(response);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component={'img'}
          className={classes.media}
          image={params.row.driverImage}
          title={params.row.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {params.row.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HoverCard;