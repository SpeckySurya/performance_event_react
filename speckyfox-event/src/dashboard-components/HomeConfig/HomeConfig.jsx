import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import "./HomeConfig.css";
import HomeConfigService from "../../services/HomeConfigService";
import { useNavigate } from "react-router-dom";

const formDataDefault = {
  banner: "",
  logo: "",
  linkdinUrl: "",
  twitterUrl: "",
  facebookUrl: "",
  websiteUrl: "",
  contactUrl: "",
  youtubeUrl: "",
  footerText: "",
};

/**
 *
 * This component display a form to create or update the Home configuration settings.
 *
 * @returns Home Configuration Component
 */

export default function HomeConfig() {
  const [formData, setFormData] = useState(formDataDefault);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [homepageConfig, setHomepageConfig] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const { context } = useContext(MyContext);
  const [homeConfigFormTitle, setHomeConfigFormTitle] = useState("Create");
  const homeConfigService = new HomeConfigService();
  const navigate = useNavigate();

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setBanner(file);
  };
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  function findHomeConfig() {
    homeConfigService
      .getHomeConfigById()
      .then((response) => {
        setHomeConfigFormTitle("Update");
        setHomepageConfig(response.data);
        setFormData({
          ...response.data,
        });
      })
      .catch((error) => {
        setHomepageConfig(null);
      })
      .finally(() => setPageLoading(false));
  }

  useEffect(() => {
    findHomeConfig();
  }, []);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    context.breadCrumb.updatePages([{ name: "Home Configuration" }]);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const request = new FormData();
    for (let entry in formData) {
      request.append(entry, formData[entry]);
    }
    request.append("banner", banner);
    request.append("logo", logo);

    if (homepageConfig) {
      homeConfigService
        .updateHomeConfig(request)
        .then((response) => {
          setIsAlertVisible(true);
          setLoading(false);
          setTimeout(() => {
            navigate("/dashboard/events");
          }, 3000);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    } else {
      homeConfigService
        .saveHomeConfig(request)
        .then((response) => {
          setLoading(false);
          setIsAlertVisible(true);
          navigate("/dashboard");
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }
  };

  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <Box width={"100%"}>
      {pageLoading ? (
        <Stack alignItems={"center"} sx={{ margin: "auto", width: "10%" }}>
          <CircularProgress sx={{ color: "lightgray" }} />
        </Stack>
      ) : (
        <div className="event-form-container">
          <h1>{homeConfigFormTitle} Home Configuration</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventBanner">Event Banner</label>
              <Typography fontSize={10}>Max file size : 2 MB</Typography>
              <input
                type="file"
                id="eventBanner"
                name="eventBanner"
                placeholder="Event Banner"
                onChange={handleBannerChange}
                required
              />
              {homepageConfig && (
                <Box width={"100px"} py={1}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={formData.banner}
                  />
                </Box>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="logo">Website Logo</label>
              <input
                type="file"
                id="logo"
                name="logo"
                placeholder="Website Logo"
                onChange={handleLogoChange}
                required
              />
              {homepageConfig && (
                <Box width={"100px"} py={1}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={formData.logo}
                  />
                </Box>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="linkdinUrl">LinkedIn URL</label>
              <input
                type="url"
                id="linkdinUrl"
                name="linkdinUrl"
                placeholder="LinkedIn URL"
                value={formData.linkdinUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="twitterUrl">Twitter URL</label>
              <input
                type="url"
                id="twitterUrl"
                name="twitterUrl"
                placeholder="Twitter URL"
                value={formData.twitterUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="facebookUrl">Facebook URL</label>
              <input
                type="url"
                id="facebookUrl"
                name="facebookUrl"
                placeholder="Facebook URL"
                value={formData.facebookUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="websiteUrl">Website URL</label>
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                placeholder="Website URL"
                value={formData.websiteUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactUrl">Contact URL</label>
              <input
                type="url"
                id="contactUrl"
                name="contactUrl"
                placeholder="Contact URL"
                value={formData.contactUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="youtubeUrl">Youtube URL</label>
              <input
                type="url"
                id="youtubeUrl"
                name="youtubeUrl"
                placeholder="Youtube URL"
                value={formData.youtubeUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="footerText">Footer Text</label>
              <input
                id="footerText"
                name="footerText"
                placeholder="Footer Text"
                value={formData.footerText}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="flex-jcc-aic">
              {loading ? (
                <CircularProgress size={20} color={"error"} />
              ) : (
                "Submit"
              )}
            </button>
          </form>
          <Box py={2}>
            {isAlertVisible && (
              <Alert
                onClose={() => {
                  handleAlertClose();
                }}
              >
                Home Configuration Successfully Saved !
              </Alert>
            )}
          </Box>
          {snackbar}
        </div>
      )}
    </Box>
  );
}
