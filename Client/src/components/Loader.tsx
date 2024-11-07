export const Loader = () => {

    
    return <>
        <div id="loader">
      <div className="container">
        <div className="image"></div>
        <div className="progress">
          <div className="progress-bar">
            <div className="shimmer">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
}






// import styled, { keyframes } from "styled-components";

// interface ILoaderProps {
//     size: number;
//   }
  
//   const rotatewhite = keyframes`
//       from {
//           transform: rotateX(45deg) rotateY(-35deg) rotateZ(0deg);
//       }
//       to {
//           transform: rotateX(45deg) rotateY(-35deg) rotateZ(360deg);
//       }
//   `;
  
//   const rotatered = keyframes`
//       from {
//           transform: rotateX(45deg) rotateY(35deg) rotateZ(0deg);
//       }
//       to {
//           transform: rotateX(45deg) rotateY(35deg) rotateZ(360deg);
//       }
//   `;
  
//   const rotateorange = keyframes`
//       from {
//           transform: rotateX(70deg) rotateZ(0deg);
//       }
//       to {
//           transform: rotateX(70deg) rotateZ(360deg);
//       }
//   `;
  
//   const rotateyellow = keyframes`
//       from {
//           transform: rotateY(70deg) rotateZ(0deg);
//       }
//       to {
//           transform: rotateY(70deg) rotateZ(360deg);
//       }
//   `;
  
//   const StyledLoader = styled.div<ILoaderProps>`
//     height: ${(props) => props.size + "px"};
//     width: ${(props) => props.size + "px"};
//     position: relative;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin: 0 auto;
//     margin-top: 80px;
//     background-color: ${({ theme }) => theme.textContainerBackgroundColor};
//   `;
  
//   const StyledCircle = styled.div`
//     position: absolute;
//     height: 80%;
//     width: 80%;
//     border-radius: 50%;
//     border-style: solid;
  
//     &.white {
//       border-width: 3px 3px 0px 0px;
//       border-color: #000000 black transparent transparent;
//       animation: 1s ${rotatewhite} linear infinite;
//     }
  
//     &.red {
//       border-width: 0 0 3px 3px;
//       border-color: transparent transparent #79817a;
//       animation: 1s ${rotatered} linear infinite;
//     }
  
//     &.orange {
//       border-width: 0 3px 3px 0;
//       border-color: transparent #808080 transparent;
//       animation: 1s ${rotateorange} linear infinite;
//     }
  
//     &.yellow {
//       border-width: 3px 0 0 3px;
//       border-color: #81988f transparent transparent;
//       animation: 1s ${rotateyellow} linear infinite;
//     }
//   `;
  
//   const Loader = ({ size }: ILoaderProps) => {
//     return (
//       <StyledLoader size={size}>
//         <StyledCircle className="white"></StyledCircle>
//         <StyledCircle className="red"></StyledCircle>
//         <StyledCircle className="orange"></StyledCircle>
//         <StyledCircle className="yellow"></StyledCircle>
//       </StyledLoader>
//     );
//   };
  
//   export default Loader;

