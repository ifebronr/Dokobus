import Image from "../styled/Image"
import {Avatar , AvatarInformation} from "../styled/Avatar"
import {Card , CardWrapper} from "../styled/Card"
import {ReactComponent as PhoneIcon} from "../icons/bxs-phone.svg";
import {ReactComponent as UserDefaultIcon } from '../icons/bxs-user-circle.svg'
import {ReactComponent as UserBadgeIcon} from "../icons/bxs-user-badge.svg";

const DriverDetailsCard = ({driver_id,driver}) => {
    return ( 
        
       <Card>
           <CardWrapper>
            <Avatar size = {60}>
                <Image 
                        src= {driver.displayImage ? driver.displayImage:<UserDefaultIcon />} 
                        alt={`${driver.name}'s Photo`} />
            </Avatar>
            <AvatarInformation>
                <p>{driver.name}</p>
                <p><span><UserBadgeIcon/>  {driver_id}</span> <span><PhoneIcon />{driver.contactNumber}</span></p>
            </AvatarInformation>
            </CardWrapper>
       </Card>
     );
}
export default DriverDetailsCard