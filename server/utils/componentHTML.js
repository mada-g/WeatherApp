import React from 'react';
import {RoutingContext, match} from 'react-router';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';

export default function(routes, url, store){
  return new Promise((resolve, reject)=>{
    match({routes, location: url}, (err, redirectLocation, renderProps) => {
       if(err || !renderProps){
         reject(err);
       }
       else{
         const component = (
           <Provider store={store}>
             <RoutingContext {...renderProps} />
            </Provider>
         );

         const componentHTML = renderToString(component);
         resolve(componentHTML);
       }
     })
   });
 };
