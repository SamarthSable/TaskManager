// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const TeamMemberCard = ({ member }) => {
//   return (
//     <View style={styles.memberCard}>
//       <View style={[styles.avatar, { backgroundColor: member.avatarColor }]}>
//         <Text style={styles.avatarText}>{member.initials}</Text>
//       </View>

//       <View style={styles.memberInfo}>
//         <Text style={styles.memberName}>{member.name}</Text>

//         <Text style={styles.role}>{member.role}</Text>
//       </View>

//       <View style={[styles.badge, { backgroundColor: member.badgeColor }]}>
//         <Text style={[styles.badgeText, { color: member.badgeTextColor }]}>
//           {member.badge}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default TeamMemberCard;

// const styles = StyleSheet.create({
//   memberCard: {
//     padding: 16,

//     borderRadius: 12,

//     backgroundColor: '#FFFFFF',

//     borderWidth: 1,
//     borderColor: '#E2E8F0',

//     flexDirection: 'row',
//     alignItems: 'center',

//     gap: 12,
//   },

//   avatar: {
//     width: 44,
//     height: 44,

//     borderRadius: 22,

//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   avatarText: {
//     fontSize: 14,

//     fontWeight: '700',

//     color: '#FFFFFF',
//   },

//   memberInfo: {
//     flex: 1,
//   },

//   memberName: {
//     fontSize: 16,

//     fontWeight: '600',

//     color: '#1E293B',
//   },

//   role: {
//     marginTop: 2,

//     fontSize: 12,

//     color: '#6B7280',
//   },

//   badge: {
//     paddingHorizontal: 12,
//     paddingVertical: 5,

//     borderRadius: 999,
//   },

//   badgeText: {
//     fontSize: 12,

//     fontWeight: '600',
//   },
// });
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Padding, Radius } from '../../constants/globalStyle';

const TeamMemberCard = ({ member }) => {
  return (
    <View style={styles.memberCard}>
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: member.color,
          },
        ]}
      >
        <Text style={styles.avatarText}>{member.initials}</Text>
      </View>

      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>

        <Text style={styles.role}>Team Member</Text>
      </View>
    </View>
  );
};

export default TeamMemberCard;

const styles = StyleSheet.create({
  memberCard: {
    padding: Padding.md,
    borderRadius: Radius['3xl'],
    backgroundColor: Colors.surface,

    borderWidth: 1,
    borderColor: Colors.border,

    flexDirection: 'row',
    alignItems: 'center',

    gap: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,

    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },

  memberInfo: {
    flex: 1,
  },

  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },

  role: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
