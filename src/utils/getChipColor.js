const getChipColor = (name) => {
  switch (name) {
    case "Kombucha":
      return "#FFEBCE";
    case "Kombucha (Caffeinated)":
      return "#DDEBF1";
    case "Hard Kombucha":
      return "#FBE4E4";
    case "Hard Jun":
      return "#FBE4E4";
    case "Kombucha (CBD)":
      return "#DDEDEA";
    case "Jun":
      return "#DDEDEA";
    default:
      return "#FFEBCE";
  }
};

export default getChipColor;
