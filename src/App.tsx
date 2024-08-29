// App.tsx
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ConfigForm from "./ConfigForm";
import { getConfig, updateConfig } from "./api";
import { Config } from "./interface";

function App() {
  const [config, setConfig] = useState<Config | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const data = await getConfig();
      setConfig(data);
    } catch (err) {
      setError("Failed to fetch configuration");
    }
  };

  const handleSubmit = async (newConfig: Config) => {
    try {
      await updateConfig(newConfig);
      setConfig(newConfig);
    } catch (err) {
      setError("Failed to update configuration");
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!config) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Typography variant="h6" gutterBottom>
        Image Resize Settings
      </Typography>
      <ConfigForm config={config} onSubmit={handleSubmit} />
    </Box>
  );
}

export default App;
