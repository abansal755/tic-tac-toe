import ClearIcon from '@mui/icons-material/Clear';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

const MoveIcon = (props) => {
    const newProps = {};
    for(const key in props)
        if(key !== 'state')
            newProps[key] = props[key];
    
    if(props.state === 'cross')
        return <ClearIcon {...newProps}/>
    if(props.state === 'circle')
        return <PanoramaFishEyeIcon {...newProps} />
    return;
}

export default MoveIcon;