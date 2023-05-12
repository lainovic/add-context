function ImageOutput({ image }) {
  return (
    <img
      src={image}
      alt="A given image."
      style={{
        maxHeight: "40vh",
        maxHeight: "40dvh",
      }}
    ></img>
  )
}

export default ImageOutput;
