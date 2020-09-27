import React, { useState } from "react";
import Loader from "../common/spinner";
import fileDownloader from "js-file-download";
import "../common/convert.css";
import { notify, confirm } from "react-easy-notify";
import "react-easy-notify/dist/index.css";
import { sendStream, receiveStream, apiUri } from "../../helpers";
import { useEffect } from "react";
export const Home = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(false);
  const [progress, setProgress] = useState(null);
  const [link, setDownloadableLink] = useState(null);
  const onChangeFile = ({ target }) => {
    if (target.files && target?.files[0]) {
      setFilename(target.files[0]?.name);
      setFile(target.files);
      setSelected(true);
    }
  };

  const selectElement = (element) => document.querySelector(element);

  const add = () => {
    selectElement(".file-drop-area").classList.add("is-active");
  };
  const removed = () => {
    selectElement(".file-drop-area").classList.remove("is-active");
  };

  const handleVideo = () => {
    sendStream("video/upload", { file: file[0], fileInfo: file, type });
  };

  receiveStream("video/progress", function (data) {
    setProgress(data.percent.toString());
    if (data.percent.toString().split(".")[0] === "100") {
      notify({
        timeout: 5000,
        title: "success",
        type: "success",
        animationType: "pops-up",
        message: "file is successfully uploaded",
        position: "top-right",
      });
    }
  });

  useEffect(() => {
    if (localStorage.getItem("accepted") === "false")
      confirm({
        text:
          "Thanks for using our website to convert your videos, we would tell you that we will not store your videos after conversion so be sure about that. When you upload your video we start processing, after our api finishing conversion we delete the old video, then we wait until you download the new version of your video then we delete it after downloading is finished.",
        buttonTitle: "I UNDERSTAND THAT",
        callback: () => {
          localStorage.setItem("accepted", "true");
        },
      });
  }, []);

  receiveStream("video/downloadable", function (data) {
    // console.log(data);
    setDownloadableLink(data.filename);
  });

  const downloadFile = async () => {
    await fetch(`${apiUri}/${link}`, { method: "GET" })
      .then((data) => data.blob())
      .then((data) => {
        fileDownloader(data, link);

        setProgress(null);
        setSelected(false);
        setType("");
        setFile(null);
        setDownloadableLink(null);
        setFilename("");
      });
  };

  return (
    <div>
      <main>
        <div className="container">
          <div className="intro">
            <h2> Easily convert video </h2>
            <br></br>
            <h5> {filename}</h5>
          </div>

          <div className="choose-file">
            <div className="file">
              <div
                className="input-file"
                onDragEnter={add}
                onFocus={add}
                onClick={add}
                onDragLeave={removed}
                onBlur={removed}
                onDrop={removed}
                // onChange={(e) => onChangeFile(e)}
              >
                <div className="file-drop-area">
                  <span className="fake-btn">Choose files</span>
                  <span className="file-msg">or drag and drop files here</span>
                  <input
                    className="file-input"
                    type="file"
                    accept="video/*"
                    onChange={onChangeFile}
                    multiple
                  />
                </div>
              </div>
            </div>

            {selected && (
              <div className="convert">
                <h2> to </h2>
              </div>
            )}
            {selected && (
              <div className="extension">
                <select
                  className="custom-select"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="mp4">select converting type</option>
                  <option value="mp4">mp4</option>
                  <option value="flv">flv</option>
                  <option value="webm">webm</option>
                  <option value="mp3">mp3 (audio)</option>
                </select>
              </div>
            )}
          </div>

          <div className="after-chose">
            {!link ? (
              <div>
                {type && !progress && (
                  <button className="download" onClick={handleVideo}>
                    {" "}
                    Upload Now{" "}
                  </button>
                )}
                {progress && (
                  <div className="load">
                    <Loader />
                    <p>
                      {" "}
                      {progress?.split(".")[0]} <span>%</span>{" "}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <button className="download" onClick={downloadFile}>
                {" "}
                Download Now{" "}
              </button>
            )}
          </div>
        </div>
      </main>

      <footer>
        <span>
          Coding by{" "}
          <a href="https://github.com/ElsiddigAhemd">@Elsiddig Abdulmoniem</a>&
          Designed by{" "}
          <a href="https://www.facebook.com/abobakerhilal/">@Abobaker Hilal</a>
        </span>
      </footer>
    </div>
  );
};
