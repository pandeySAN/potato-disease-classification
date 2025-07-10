import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Container,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import ClearIcon from "@material-ui/icons/Clear";
import { common } from "@material-ui/core/colors";
import backgroundImage from "./bg.png";

const axios = require("axios").default;

// Custom styled button
const StyledButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": {
      backgroundColor: "#ffffff7a",
    },
  },
}))(Button);

// Styles for the components
const useStyles = makeStyles((theme) => ({
  grow: { flexGrow: 1 },
  appbar: {
    backgroundColor: "#be6a77",
    boxShadow: "none",
    color: "white",
  },
  mainContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "93vh",
    marginTop: "8px",
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: "transparent",
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%)",
    borderRadius: "15px",
  },
  imageCardEmpty: {
    height: "auto",
  },
  media: { height: 400 },
  detail: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    color: "#be6a77 !important",
  },
  tableCell: {
    fontSize: "22px",
    backgroundColor: "transparent",
    color: "#000000a6",
    fontWeight: "bold",
    padding: "1px 24px",
  },
  tableCellLabel: {
    fontSize: "14px",
    backgroundColor: "transparent",
    color: "#000000a6",
    fontWeight: "bold",
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  clearButton: {
    width: "100%",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: "bold",
  },
}));

export const ImageUpload = () => {
  const classes = useStyles();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [loading, setLoading] = useState(false);

  let confidence = 0;

  const uploadToBackend = async () => {
    if (hasImage) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(process.env.REACT_APP_API_URL, formData);
        if (response.status === 200) {
          setResult(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch prediction:", error);
      }

      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setHasImage(false);
  };

  const onFileSelected = (files) => {
    if (!files || files.length === 0) {
      handleReset();
      return;
    }
    setFile(files[0]);
    setHasImage(true);
    setResult(null);
  };

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
  }, [file]);

  useEffect(() => {
    if (!preview) return;
    setLoading(true);
    uploadToBackend();
  }, [preview]);

  if (result) {
    confidence = (parseFloat(result.confidence) * 100).toFixed(2);
  }

  return (
    <>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Potato Leaf Disease Detector
          </Typography>
          <div className={classes.grow} />
          <Avatar />
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} className={classes.mainContainer} disableGutters>
        <Grid container spacing={2} className={classes.gridContainer} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!hasImage ? classes.imageCardEmpty : ""}`}>
              {hasImage && (
                <CardActionArea>
                  <CardMedia component="img" className={classes.media} image={preview} title="Preview" />
                </CardActionArea>
              )}
              {!hasImage && (
                <CardContent>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText="Upload a potato leaf image for disease prediction"
                    onChange={onFileSelected}
                  />
                </CardContent>
              )}
              {result && (
                <CardContent className={classes.detail}>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableCellLabel}>Disease</TableCell>
                          <TableCell align="right" className={classes.tableCellLabel}>Confidence</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell className={classes.tableCell}>{result.class}</TableCell>
                          <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
              {loading && (
                <CardContent className={classes.detail}>
                  <CircularProgress className={classes.loader} />
                  <Typography variant="h6">Analyzing...</Typography>
                </CardContent>
              )}
            </Card>
          </Grid>

          {result && (
            <Grid item className={classes.buttonGrid}>
              <StyledButton
                variant="contained"
                className={classes.clearButton}
                onClick={handleReset}
                startIcon={<ClearIcon fontSize="large" />}
              >
                Clear
              </StyledButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};
