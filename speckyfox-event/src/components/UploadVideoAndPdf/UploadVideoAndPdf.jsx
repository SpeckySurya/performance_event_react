import {
  Card,
  CardContent,
  Grid,
  InputLabel,
  Button,
  Stack,
  Input,
} from "@mui/material";
import "./UploadVideoAndPdf.css";
import InputAdornment from "@mui/material/InputAdornment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SelectAutoWidth from "./SelectAutoWidth";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { useState } from "react";

function UploadVideoAndPdf() {
  const [uploadFile, setuploadFile] = useState("");
  const [uploadVideo, setuploadVideo] = useState("");
  function fundisplayfileandvideo() {
    console.log(uploadFile, uploadVideo);
  }
  return (
    <>
      <Stack>
        <Card
          style={{
            margin: "40px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            maxWidth: "400px",
          }}
        >
          <CardContent>
            <h3 className="uploadpdfh3">Upload File</h3>
            <SelectAutoWidth />

            <Grid spacing={1}>
              <Grid xs={12} sm={6} item>
                <InputLabel className="uploadvideotext">Upload File</InputLabel>
                <Input
                  style={{ paddingLeft: "10px" }}
                  className="uploadpdf"
                  type="file"
                  inputProps={{
                    accept: "application/pdf,application/vnd.ms-powerpoint,",
                  }}
                  name="pfd-File"
                  id="pfd-File"
                  variant="outlined"
                  onChange={(e) => setuploadFile(e.target.value)}
                  fullWidth
                  endAdornment={
                    <InputAdornment
                      position="end"
                      style={{ paddingRight: "15px" }}
                    >
                      <UploadFileOutlinedIcon />
                    </InputAdornment>
                  }
                />
              </Grid>

              <Grid xs={12} sm={6} item>
                <InputLabel className="uploadvideotext">
                  Upload Video
                </InputLabel>
                <Input
                  style={{ paddingLeft: "10px" }}
                  className="uploadvideo"
                  type="file"
                  inputProps={{ accept: "video/mp4,video/x-m4v,video/*" }}
                  name="video-file"
                  id="video-file"
                  onChange={(e) => setuploadVideo(e.target.value)}
                  variant="outlined"
                  fullWidth
                  endAdornment={
                    <InputAdornment
                      position="end "
                      style={{ paddingRight: "15px" }}
                    >
                      <CloudUploadIcon />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid xs={12} sm={12} marginY={2} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth="100%"
                  onClick={fundisplayfileandvideo}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}
export default UploadVideoAndPdf;
