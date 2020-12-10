import { useEffect, useState } from 'react';
import styled from 'styled-components';

function useExtraStyledComponent(DefaultComponent, extraStyles) {
    const [Component, setComponent] = useState(DefaultComponent);

    useEffect(() => {
        if (extraStyles != null) {
            const { stringArray, variables } = extraStyles;
            const ExtraStyledComponent = styled(DefaultComponent)(stringArray, ...variables);
 
            setComponent(ExtraStyledComponent);
        }
    }, [DefaultComponent, extraStyles]);

    return Component;
}

export default useExtraStyledComponent;