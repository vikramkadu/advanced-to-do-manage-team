import { format, formatDistanceStrict } from 'date-fns';

// UI Components
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import MemberCard from './MemberCard';

// Hooks and Functions
import { useAppSelector } from '../../../../app/hooks';
import { selectTeam } from '../../../team/teamSlice';

// Data and Types
import { Rating, Task } from '../../../../types/data.types';

// ---------------------

type TaskTableInfoProps = {
  task: Task;
};

function TaskTableInfo({ task }: TaskTableInfoProps) {
  // Getting members buy filtering team and choose the members for have ID in the deveolopers array in tasks
  const devTeam = useAppSelector(selectTeam).filter((member) =>
    task.developers.includes(member.id)
  );

  // All Task Information in a table UI format
  return (
    <Box>
      <Paper>
        <Grid
          container
          sx={{
            mt: 2,
            p: 1,
            // pl: 2,
            pt: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          columnSpacing={2}
          rowSpacing={1}>
          {task.title && (
            <>
              <Grid item xs={4} alignSelf="flex-start">
                <Typography variant="subtitle2" fontWeight={700}>
                  Title
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{task.title}</Typography>
              </Grid>
            </>
          )}
          {task.description && (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4} alignSelf="flex-start">
                <Typography variant="subtitle2" fontWeight={700}>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{task.description}</Typography>
              </Grid>
              <Divider />
            </>
          )}
          {!!task.developers?.length && (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={4} alignSelf="flex-start">
                <Typography variant="subtitle2" fontWeight={700}>
                  Developers team
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                {devTeam.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </Grid>
              <Divider />
            </>
          )}
          {task?.estimatedTime && (
            <>
              {!!task.developers?.length && (
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              )}
              <Grid item xs={4} alignSelf="flex-start">
                <Typography variant="subtitle2" fontWeight={700}>
                  Estimated Time
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">
                  {formatDistanceStrict(
                    new Date(Date.now() + task.estimatedTime * 1000),
                    new Date(Date.now())
                  )}
                </Typography>
              </Grid>
              <Divider />
            </>
          )}
          {task?.startingTime && (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4} alignSelf="flex-start">
                <Typography variant="subtitle2" fontWeight={700}>
                  Starting Time
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">
                  {format(task.startingTime, 'dd MMM yyyy')}
                </Typography>
              </Grid>
              <Divider />
            </>
          )}
          {task?.endingTime && (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4} alignSelf="flex-start">
                <Typography variant="subtitle2" fontWeight={700}>
                  Ending Time
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">
                  {format(task.endingTime, 'dd MMM yyyy')}
                </Typography>
              </Grid>
            </>
          )}
          {task.hasOwnProperty('rating') && (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4} alignSelf="flex-start">
                <Typography variant="subtitle2" fontWeight={700}>
                  Rating
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">
                  {task.rating === Rating.aheadOfSchedule ? (
                    <Chip
                      label="Ahead of Shedule"
                      color="success"
                      variant="filled"
                      size="small"
                    />
                  ) : task.rating === Rating.behindSchedule ? (
                    <Chip
                      label="Behind schedule"
                      color="error"
                      variant="filled"
                      size="small"
                    />
                  ) : task.rating === Rating.onSchedule ? (
                    <Chip
                      label="on time"
                      color="info"
                      variant="filled"
                      size="small"
                    />
                  ) : (
                    <></>
                  )}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}

export default TaskTableInfo;
