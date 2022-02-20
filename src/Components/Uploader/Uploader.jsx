import React, { useEffect, useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import { styled } from "baseui";
import { UploadIcon } from "../../assets/icons/UploadIcon";

const Text = styled("span", ({ $theme }) => ({
  ...$theme.typography.font14,
  fontFamily: $theme.typography.primaryFontFamily,
  color: "#111",
  marginTop: "15px",
  textAlign: "center",
}));

const TextHighlighted = styled("span", ({ $theme }) => ({
  color: "#fff",
  fontWeight: "bold",
}));

const Container = styled("div", ({ props }) => ({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: "#E6E6E6",
  borderStyle: "dashed",
  backgroundColor: "#ffffff",
  color: "#bdbdbd",
  outline: "none",
  transition: "border 0.24s ease-in-out",
  cursor: "pointer",
}));

const ThumbsContainer = styled("aside", () => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: "16px",
}));

const Thumb = styled("div", ({ $theme }) => ({
  ...$theme.borders.borderEA,
  display: "inline-flex",
  borderRadius: "2px",
  marginBottom: "8px",
  marginRight: "8px",
  width: "100px",
  height: "100px",
  padding: "4px",
  boxSizing: "border-box",
}));

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Uploader({ onChange, imageURL }) {
  return (
    <section className="container uploader" style={{ cursor: "pointer" }}>
      <Dropzone onDrop={(acceptedFiles) => console.log()}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                <span style={{ color: "rgb(0, 197, 141)" }}>Drag 'n' drop</span>{" "}
                some files here, or click to select files
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    </section>
  );
}

export default Uploader;
