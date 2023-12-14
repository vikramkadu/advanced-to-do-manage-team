// UI Components
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// Data and Types
import { Member } from '../../../../types/data.types';

type MemberCardProps = {
  member: Member;
};

/**
 * Passing team member to it and returns JSX Component previewing the team member information
 *
 * @param param0 {member: team member}
 * @returns team member information
 */
function MemberCard({ member }: MemberCardProps) {
  return (
    <Box display="flex" alignItems="center" p={1} sx={{ width: '100%' }}>
      {/* Member Image */}
      <Avatar src={member.image} alt={member.name} />
      <Box ml={2} flexGrow={1}>
        {/* Member ID */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          textAlign="start">
          {member.id}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap">
          {/* Member Name */}
          <Typography variant="h6">{member.name}</Typography>
          {/* Member Job */}
          <Chip label={member.job} />
        </Box>
      </Box>
    </Box>
  );
}

export default MemberCard;
