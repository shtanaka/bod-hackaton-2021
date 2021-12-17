/**
 * Model of the Firestore data structure.
 */
export const model = {
  users: {
    USER_ID: {
      displayName: '',
      photoURL: '',
      creditsEarned: 0,
    },
  },
  challenges: {
    CHALLENGE_ID: {
      title: '',
      mediaURL: '',
      createdAt: '2021-12-17T00:00:00Z',
      endsAt: '2021-12-17T00:30:00Z',
      ended: false,
      likes: {
        LIKE_USER_ID: true,
      },
      challenger: {
        userId: '',
        displayName: '',
        photoUrl: '',
      },
      shots: {
        SHOT_ID: {
          title: '',
          mediaURL: '',
          isWinner: true,
          creditsEarned: 0,
          likes: {
            LIKE_USER_ID: true,
          },
          contestant: {
            userId: '',
            displayName: '',
            photoURL: '',
          },
        },
      },
    },
  },
};
