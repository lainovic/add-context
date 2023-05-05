function ImageOutput({ image }) {
  return (
    <img
      src={image}
      width="50%"
      style={{ maxHeight: "800px" }}
      alt="A given image."
    ></img>
  )
}

export default ImageOutput;
