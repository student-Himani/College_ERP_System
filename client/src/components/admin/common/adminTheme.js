export const adminColors = {
  primary: "#5B4B8A",
  primaryHover: "#4A3A7A",
  primaryLight: "#F3F0FA",
  primaryMuted: "#8B7BB5",
  border: "#E5E7EB",
  surface: "#F8FAFC",
  text: "#1F2937",
  textMuted: "#6B7280",
};

export const muiSelectSx = {
  height: 42,
  borderRadius: "10px",
  fontSize: "0.875rem",
  backgroundColor: "#fff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: adminColors.border,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: adminColors.primaryMuted,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: adminColors.primary,
    borderWidth: "2px",
  },
};
