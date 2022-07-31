import styled from "styled-components";

const Wrapper = styled.section`
  .disableLink {
    pointer-events: none;
  }
  .printPage {
    display: none;
  }
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  table {
    .status-pill {
      border-radius: 20px;
      padding: 5px;
    }
    .red {
      background-color: #fecaca;
    }
    .blue {
      background-color: #7dd3fc;
    }
    thead {
      tr {
        th {
          span {
            color: white;
            svg {
              fill: teal !important;
              opacity: 1 !important;
            }
          }
          span:hover {
            color: white;
            svg {
              fill: white;
            }
          }
          span:active {
            color: white;
            svg {
              fill: white;
            }
          }
          span:focus {
            color: white;
            svg {
              fill: white;
            }
          }
        }
      }
    }
  }
  .actions {
    display: flex;
    column-gap: 5px;
    justify-content: flex-end;
  }
  .MuiTableRow-hover:hover {
    background-color: #f0fdfa !important;
  }
  .MuiToolbar-root {
    p {
      margin: unset !important;
    }

    .MuiTablePagination-selectLabel {
    }
  }
  .edit-icon {
    background-color: teal;
    display: flex;
    align-content: center;
    border-radius: 100%;
    cursor: pointer;
    padding: 5px;
    pointer-events: visible;
    .MuiSvgIcon-root {
      fill: wheat;
    }
  }
  .edit-icon:hover {
    background-color: darkblue;
  }
  .edit-icon:active,
  .delete-icon:active {
    transform: translatey(0.175rem);
  }
  .delete-icon:hover {
    background-color: red;
  }
  .delete-icon {
    background-color: crimson;
    display: flex;
    cursor: pointer;
    align-content: center;
    border-radius: 100%;
    padding: 5px;
    .MuiSvgIcon-root {
      fill: wheat;
    }
  }

  @media print {
    .noPrint {
      display: none !important;
    }
    .printPage {
      display: block;
    }
    table {
      .status-pill {
        border-radius: 20px !important;
        padding: 5px !important;
      }
      .red {
        background-color: #fecaca !important;
      }
      .blue {
        background-color: #7dd3fc !important;
      }
      thead {
        tr {
          th {
            span {
              color: white !important;
              svg {
                fill: teal !important ;
                opacity: 1 !important ;
              }
            }
            span:hover {
              color: white !important;
              svg {
                fill: white !important;
              }
            }
            span:active {
              color: white !important;
              svg {
                fill: white !important;
              }
            }
            span:focus {
              color: white !important;
              svg {
                fill: white !important;
              }
            }
          }
        }
      }
    }
    .actions {
      display: flex !important;
      column-gap: 5px !important;
      justify-content: flex-end !important;
    }
    .MuiTableRow-hover:hover {
      background-color: #f0fdfa !important;
    }
    .MuiToolbar-root {
      p {
        margin: unset !important ;
      }

      .MuiTablePagination-selectLabel {
      }
    }
    .edit-icon {
      background-color: teal !important;
      display: flex !important;
      align-content: center !important;
      border-radius: 100% !important;
      cursor: pointer !important;
      padding: 5px !important;
      pointer-events: visible !important;
      .MuiSvgIcon-root {
        fill: wheat !important;
      }
    }
    .edit-icon:hover {
      background-color: darkblue !important;
    }
    .edit-icon:active,
    .delete-icon:active {
      transform: translatey(0.175rem) !important;
    }
    .delete-icon:hover {
      background-color: red !important;
    }
    .delete-icon {
      background-color: crimson !important;
      display: flex !important;
      cursor: pointer !important;
      align-content: center !important;
      border-radius: 100% !important;
      padding: 5px !important;
      .MuiSvgIcon-root {
        fill: wheat !important;
      }
    }
  }
`;
export default Wrapper;
