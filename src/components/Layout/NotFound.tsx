import * as React from 'react';

export interface NotFoundProps {
    
}
 
const NotFound: React.FC<NotFoundProps> = () => {
    return ( 
        <div>
            <p>You must be lost.</p>
        </div>
     );
}
 
export default NotFound;