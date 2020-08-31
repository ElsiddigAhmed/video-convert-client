import React from 'react';
import "./convert.css"
import Loader from '../../spinner/loader';
export default function convert(props) {
    return (
        <div>
            <main>
                <div className="container">
                    <div className="intro">
                        <h2> Easily convert video </h2>
                    </div>

                    <div className="choose-file">
                        <div className="file">
                            <div className="input-file"
                                onDragEnter={props.add}
                                onFocus={props.add}
                                onClick={props.add}
                                onDragLeave={props.removed}
                                onBlur={props.removed}
                                onDrop={props.removed}
                                onChange={e => props.change(e)}
                            >
                                <div className="file-drop-area">
                                    <span className="fake-btn">Choose files</span>
                                    <span className="file-msg">or drag and drop files here</span>
                                    <input className="file-input" type="file" multiple />
                                </div>
                            </div>
                        </div>
                        <div className="convert">
                            <h2> to </h2>
                        </div>
                        <div className="extension">
                            <select className="custom-select">
                                <option value="mp4">mp4</option>
                                <option value="mp4">mp5</option>
                                <option value="mp4">mp7</option>
                                <option value="mp4">mp8</option>
                            </select>
                        </div>
                    </div>

                    <div className="after-chose">
                        <div className="load">
                            <Loader />
                            <p> 80 <span>%</span> </p>
                        </div>
                        <div className="watch-now">
                            <div className="preview">
                                <div className="watch">
                                    <video controls >
                                        <source src="Pure_CSS_Circular_Progress_Bar__Html_CSS_&_SVG(720p).mp4" type="video/mp4" />
                                    sorry your browser doesn't support embedded videos
                            </video>
                                </div>
                            </div>
                            <button className="download"> Download Now </button>
                        </div>
                    </div>

                </div>
            </main>

            <footer>
                <span>
                    Coding by <a href="https://www.facebook.com/elsiddig.sama.7">@Elsiddig Abdulmoniem</a>
                    &
                    Designed by <a href="https://www.facebook.com/abobakerhilal/">@Abobaker Hilal</a>
                </span>
            </footer>
        </div>
    );

}

