import { ReportViewContainer, SearchReportContainer } from "../../components";
import { useReactToPrint } from "react-to-print";
import { forwardRef, useRef } from "react";

const Report = forwardRef((props, ref) => {
  const componentRef = useRef();

  const handlePrintMain = (e) => {
    e.preventDefault();
    handlePrint();
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div ref={componentRef}>
      <SearchReportContainer />
      <ReportViewContainer handlePrintMain={handlePrintMain} />
    </div>
  );
});

export default Report;
