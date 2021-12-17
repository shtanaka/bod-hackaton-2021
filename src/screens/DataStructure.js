import * as React from 'react';
import { TextField, Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  useCollection,
  useDocument,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import {
  auth,
  references,
  createChallenge,
  createShot,
} from '../services/firebase';
import { useMutation } from 'react-query';

export function DataStructure() {
  const [user] = useAuthState(auth);
  const [userProfile] = useDocumentData(references.user(user?.uid));
  const [challenges] = useCollection(references.challenges);

  const [newChallengeTitle, setNewChallengeTitle] = React.useState('');
  const [challengeId, setChallengeId] = React.useState(null);

  const [challenge] = useDocument(references.challenge(challengeId));
  const [shots] = useCollection(references.shots(challengeId));

  const [newShotTitle, setNewShotTitle] = React.useState('');
  const [shotId, setShotId] = React.useState(null);

  console.log('hey');

  const challengeCreate = useMutation(async () => {
    await createChallenge({
      title: newChallengeTitle,
      mediaURL: 'https://dl8.webmfiles.org/big-buck-bunny_trailer.webm',
      challenger: {
        userId: user?.uid,
        displayName: userProfile?.displayName,
        photoURL: userProfile?.photoURL,
      },
    });
  });

  const shotCreate = useMutation(async () => {
    await createShot(challengeId, {
      title: newShotTitle,
      mediaURL: 'https://dl8.webmfiles.org/big-buck-bunny_trailer.webm',
      contender: {
        userId: user?.uid,
        displayName: userProfile?.displayName,
        photoURL: userProfile?.photoURL,
      },
    });
  });

  return (
    <div>
      <h3>Challenges</h3>
      <ul>
        {challenges?.docs.map((challengeDoc) => {
          const challenge = challengeDoc.data();
          return (
            <li
              key={challengeDoc.id}
              onClick={() => setChallengeId(challengeDoc.id)}
            >
              {challenge.title}
            </li>
          );
        })}
      </ul>
      <div>
        <h4>Create Challenge</h4>
        <TextField
          size="small"
          label="Title"
          value={newChallengeTitle}
          onChange={(ev) => setNewChallengeTitle(ev.target.value)}
        />
        <Button onClick={() => challengeCreate.mutate()}>Create</Button>
      </div>
      <h3>Challenge</h3>
      {challenge && <div>{challenge.data()?.title}</div>}
      <h3>Shots</h3>
      {challenge?.exists() && shots && (
        <div>
          <ul>
            {shots.docs.map((shotDoc) => {
              const shot = shotDoc.data();
              return (
                <li key={shotDoc.id} onClick={() => setShotId(shotDoc.id)}>
                  {shot.title}
                </li>
              );
            })}
          </ul>
          <div>
            <h4>Create Shot</h4>
            <TextField
              size="small"
              label="Title"
              value={newShotTitle}
              onChange={(ev) => setNewShotTitle(ev.target.value)}
            />
            <Button onClick={() => shotCreate.mutate()}>Create</Button>
          </div>
        </div>
      )}
      <h3>Shot</h3>
    </div>
  );
}
