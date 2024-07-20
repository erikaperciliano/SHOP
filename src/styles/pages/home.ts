import { transform } from "next/dist/build/swc";
import { styled } from "..";

export const HomeContainer = styled('main', {
    display: 'flex',
    width: '100%',
    maxWidth: 'cal(100vw - ((100vw - 1180px) / 2))',
    marginLeft:'auto',
    minHeight: 656,
})

export const Product = styled('div', {
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

     'span ~ img': {
            position: 'absolute',
            top: '2rem',
            right: '0.5rem',
            display: 'flex',
            alignItems: 'right',
        },

    img: {
        objectFit:'cover',
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        padding: '2rem',

        borderRadius: 6,

        display: 'flex',
        //alignItems: 'left',
        justifyContent: 'space-btween',

        flexDirection: 'column', // Change to column direction
        gap: '0.5rem', // Add gap between elements
        alignItems: 'flex-start', // Align items to the left

        backgroundColor: 'rgba(0, 0, 0, 0.6)',

        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',

        'strong': {
            fontSize: '$lg',
            color: '$gray100',
            width: '50%',
            whiteSpace: 'nowrap'
        },

        span: {
            fontSize: '$xl',
            fontWeight: 'bold',
            color: '$green300',
            padding: '0.5rem',
            whiteSpace: 'nowrap'
        }

    },

    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1
        }
    }
})