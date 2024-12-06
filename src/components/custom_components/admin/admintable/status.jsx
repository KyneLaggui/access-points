export const ConcernsBadge = ({ concerns }) => {
  let concernsClass = "";

  switch (concerns) {
    case "concern":
      concernsClass =
        "bg-status-rejectedBg text-status-rejectedText border border-status-rejectedOutline";
      break;
    case "proposal":
      concernsClass =
        "bg-status-proposalBg text-status-proposalText border border-status-proposalOutline";
      break;
    case "resolved":
      concernsClass =
        "bg-status-acceptedBg text-status-acceptedText border border-status-acceptedOutline";
      break;
    case "unresolved":
      concernsClass =
        "bg-status-pendingBg text-status-pendingText border border-status-pendingOutline";
      break;
    default:
      concernsClass =
        "bg-status-solicitationBg text-status-solicitationText border border-status-solicitationOutline";
      break;
  }

  return (
    <span className={`px-3 py-1 text-sm rounded-xl ${concernsClass}`}>
      {concerns.charAt(0).toUpperCase() + concerns.slice(1)}
    </span>
  );
};
