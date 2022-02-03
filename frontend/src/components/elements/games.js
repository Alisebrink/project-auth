import styled from 'styled-components'

export const ShowOneGame = styled.div`
display:grid;
grid-template-columns: 100% 100%;
grid-template-rows: 2;
padding:1rem;

@media (min-width:599px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: 1;
    padding:3rem;
}

@media (min-width:768px) {
    grid-template-columns: 50% 50%;
}`



export const OneGameText = styled.div`
padding:1rem;
text-align:left;
grid-row: 2 / span 1;
grid-column: 1 / span 1;

@media (min-width:599px) {
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;
    padding:3rem;
}
`