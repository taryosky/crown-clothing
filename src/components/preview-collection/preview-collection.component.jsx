import React from 'react';
import './preview-collection.style.scss'
import CollectionItem from '../collection-item/collection-item.component'; 

const PreviewCollection = ({title, items}) => (
    <div className = 'collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items.filter((it, index )=> index < 4).map(({id, ...itemsp}) => (<CollectionItem key={id} {...itemsp}/>))}
        </div>
    </div>
);

export default PreviewCollection;