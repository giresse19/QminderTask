import React from 'react';

import Wrapper from '../../hComp/Wrapper';

const layout = (props) => (
 <Wrapper>
     <div> Toolbar</div>
     <main>
         {props.children}
     </main>
 </Wrapper>
);
export default layout;
