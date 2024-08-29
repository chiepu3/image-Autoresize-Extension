//ConfigForm.tsx
import React from "react";
import { TextField, Button, Switch, FormControlLabel } from "@mui/material";
import { Config } from "./interface";

interface ConfigFormProps {
  config: Config;
  onSubmit: (config: Config) => void;
}

function ConfigForm({ config, onSubmit }: ConfigFormProps) {
  const [formState, setFormState] = React.useState(config);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormState({ ...formState, [name]: newValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="横幅をこのピクセル以下に収める"
        name="resizeWidth"
        type="number"
        value={formState.resizeWidth}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="縦幅をこのピクセル以下に収める"
        name="resizeHeight"
        type="number"
        value={formState.resizeHeight}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Switch
            checked={formState.enlargeSmallImages}
            onChange={handleChange}
            name="enlargeSmallImages"
          />
        }
        label="指定ピクセルに満たない小さな画像を拡大する"
      />
      <TextField
        fullWidth
        margin="normal"
        label="自動リサイズするフォルダ"
        name="watchFolder"
        value={formState.watchFolder}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="リサイズ後のフォルダ"
        name="resizedFolder"
        value={formState.resizedFolder}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Switch
            checked={formState.fillTransparentWithWhite}
            onChange={handleChange}
            name="fillTransparentWithWhite"
          />
        }
        label="透過画像の背景を白で埋める"
      />
      <FormControlLabel
        control={
          <Switch
            checked={formState.moveFromDownloads}
            onChange={handleChange}
            name="moveFromDownloads"
          />
        }
        label="Downloadsフォルダから条件をもとに画像を移動する"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Downloadsフォルダから移動する画像のパターン(正規表現)"
        name="downloadsFolderPattern"
        value={formState.downloadsFolderPattern}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        保存
      </Button>
    </form>
  );
}

export default ConfigForm;
