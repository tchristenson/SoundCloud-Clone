import { useState, useRef } from "react";

const DragDropFiles = () => {
  const [files, setFiles] = useState(null)
  const inputRef = useRef()

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setFiles(e.dataTransfer.files)
  }

  const handleCancel = (canceledFile) => {
    setFiles((prevFiles) => {
      const filteredFiles = Array.from(prevFiles).filter((file) => file !== canceledFile);
      return filteredFiles.length === 0 ? null : filteredFiles;
    });
  };

  if (files) return (
    <div className="uploads">
      <ul>
        {Array.from(files).map((file, idx) =>
          <li key={idx}>
            {file.name}
            <button onClick={() => handleCancel(file)}>Cancel</button>
          </li>)}
      </ul>
    </div>
  )

  return (
    <>
      {!files && (
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >

          <label>Drag and Drop Songs to Upload</label>
          <label>Or</label>
          <input
            type="file"
            accept="audio/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            hidden
            ref={inputRef}
          />
          <button onClick={() => inputRef.current.click()}>Select Songs</button>

        </div>

      )}
    </>
  )
}

export default DragDropFiles
