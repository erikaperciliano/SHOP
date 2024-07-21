import { styled } from "..";

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between', // Aligns content to the ends of the header
    alignItems: 'center', // Align content vertically
})

export const BagImageContainer = styled('div', {
    position: 'relative', // Necessary for the absolute positioning of children
    display: 'flex', // Use flexbox to align icon and counter
    flexDirection: 'column', // Align the counter below the icon
    alignItems: 'flex-end', // Align content to the right
    justifyContent: 'center',

    cursor: 'pointer',

    'img:last-child': {
        position: 'relative', // Remove absolute position for bag icon
        display: 'block', // Make sure the icon is not flex-styled
    },

    'span': {
        position: 'absolute', // Keeps the counter positioned relative to the parent container
        top: '-10px', // Adjust the counter position as needed
        right: '-10px', // Adjust the counter position as needed
        background: '$green500',
        color: 'white',
        borderRadius: '50%',
        padding: '4px 8px',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
