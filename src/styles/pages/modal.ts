import { styled } from "..";

export const Overlay = styled('div',{
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    background: '$gray800',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
})


export const Content = styled('div', {
    background: '$gray800',
    padding: '2rem',
    borderRadius: 8,
    maxWidth: 400,
    width: '100%',
    whiteSpace: 'nowrap',

    h2: {
        marginBottom: 25,
        fontSize: '$md',
        color:'$gray100'
    },

    p: {
        color:'$gray300',
        marginTop: 6
    },

    li: {
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',

    'strong, p, button': {
        fontSize: '$md',
        paddingLeft: 20
     },
    },

    img: {
        background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
        borderRadius: 8,
        objectFit: 'cover',
        height: 60
    },

})

export const RemoveButton = styled('button', {
    background: 'none',
        color: '$green500', 
        border: 'none', 
        padding: 0, 
        marginTop: 10,
        marginBottom: 15,
        fontSize: '1rem',
        cursor: 'pointer', 
        textDecoration: 'underline', 
        paddingLeft: 20
})

export const CloseButton = styled('button', {
    position: 'absolute',
    color: '$gray100',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
})

export const ModalFooter = styled('div', {
    'p:first-child':{
        marginTop: 100,
        marginBottom: 6,
    },

    display: 'grid',
  
    p: {
        margin: 0,
        display: 'grid', 
        gridTemplateColumns: '1fr auto', 
        gap: '0.5rem',
        alignItems: 'center', 
    },

    span: {
        textAlign: 'right',
    },
})

export const BuyNowButton = styled('button', {
    marginTop: 15,
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
    },

    '&:not(:disabled):hover': {
        backgroundColor: '$green300'
    },
})