import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, vs } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Defs, LinearGradient, Path, Stop, Line } from 'react-native-svg';

import StatCard from '../../components/Common/StatCard';
import ProjectCard from '../../components/Common/ProjectCard';
import projects from '../../data/projects';
import {
  Colors,
  FontSizes,
  Margin,
  Padding,
  Radius,
  Heights,
  BorderWidth,
  Widths,
} from '../../constants/globalStyle';

import { fonts } from '../../constants/fonts';

import { getAuth } from '@react-native-firebase/auth';
import { getUserProfile } from '../../services/authServices';
import { useNavigation } from '@react-navigation/native';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import { useDispatch } from 'react-redux';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);

  const currentUser = getAuth().currentUser;

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser?.uid) {
        return;
      }

      try {
        const userProfile = await getUserProfile(currentUser.uid);

        setProfile(userProfile);
      } catch (error) {
        console.log('Failed to load user profile:', error);
      }
    };

    loadProfile();
  }, [currentUser?.uid]);

  const firstName =
    profile?.firstName || currentUser?.displayName?.split(' ')[0] || 'User';

  const lastName = profile?.lastName || '';
  useEffect(() => {
    dispatch(
      showSnackbar({
        message: `Welcome Back ${firstName} ${lastName}`.trim(),
        type: 'success',
      }),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {firstName?.[0]?.toUpperCase() || 'U'}
              {lastName?.[0]?.toUpperCase() || ''}
            </Text>
          </View>

          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>

            <Text style={styles.userName}>
              {`${firstName} ${lastName}`.trim()}
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons
              name="search-outline"
              size={ms(22)}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerButton}>
            <Ionicons
              name="notifications-outline"
              size={ms(22)}
              color={Colors.textPrimary}
            />

            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* STAT CARDS */}

        <View style={styles.statsGrid}>
          <StatCard
            icon="folder-outline"
            iconColor={Colors.primary}
            iconBackground={Colors.projectBg}
            value="12"
            label="Projects"
            change="+2"
            positive
          />

          <StatCard
            icon="checkbox-outline"
            iconColor={Colors.secondary}
            iconBackground={Colors.chkBg}
            value="84"
            label="Tasks"
            change="+8"
            positive
          />

          <StatCard
            icon="time-outline"
            iconColor={Colors.warning}
            iconBackground={Colors.pendingBg}
            value="23"
            label="Pending"
            change="-3"
          />

          <StatCard
            icon="checkmark-circle-outline"
            iconColor={Colors.success}
            iconBackground={Colors.doneBg}
            value="61"
            label="Done"
            change="+11"
            positive
          />
        </View>

        {/* WEEKLY PROGRESS */}

        <View style={styles.progressCard}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>

          <WeeklyChart />
        </View>

        {/* ACTIVE PROJECTS */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Projects</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Projects')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={projects.slice(0, 3)}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.projectsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('ProjectDetail', {
                  project: item,
                })
              }
            >
              <ProjectCard project={item} varient="Home" />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="folder-open-outline"
                size={ms(40)}
                color={Colors.placeholder}
              />

              <Text style={styles.emptyText}>No projects found</Text>
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* 
   WEEKLY CHART
 */

function WeeklyChart() {
  const chartWidth = ms(300);
  const chartHeight = vs(125);

  return (
    <View style={styles.chartWrapper}>
      <View style={styles.chartArea}>
        {/* Y axis labels */}

        <View style={styles.yLabels}>
          <Text style={styles.axisText}>20</Text>
          <Text style={styles.axisText}>15</Text>
          <Text style={styles.axisText}>10</Text>
          <Text style={styles.axisText}>5</Text>
          <Text style={styles.axisText}>0</Text>
        </View>

        <View style={styles.chart}>
          <Svg width={chartWidth} height={chartHeight} viewBox="0 0 300 125">
            <Defs>
              <LinearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <Stop
                  offset="0"
                  stopColor={Colors.secondary}
                  stopOpacity="0.20"
                />

                <Stop offset="1" stopColor={Colors.secondary} stopOpacity="0" />
              </LinearGradient>
            </Defs>

            {/* Horizontal grid lines */}

            <Line
              x1="0"
              y1="5"
              x2="300"
              y2="5"
              stroke={Colors.border}
              strokeDasharray="3 4"
            />

            <Line
              x1="0"
              y1="31"
              x2="300"
              y2="31"
              stroke={Colors.border}
              strokeDasharray="3 4"
            />

            <Line
              x1="0"
              y1="57"
              x2="300"
              y2="57"
              stroke={Colors.border}
              strokeDasharray="3 4"
            />

            <Line
              x1="0"
              y1="83"
              x2="300"
              y2="83"
              stroke={Colors.border}
              strokeDasharray="3 4"
            />

            <Line
              x1="0"
              y1="109"
              x2="300"
              y2="109"
              stroke={Colors.border}
              strokeDasharray="3 4"
            />

            {/* Vertical grid lines */}

            {[0, 50, 100, 150, 200, 250, 300].map(x => (
              <Line
                key={x}
                x1={x}
                y1="0"
                x2={x}
                y2="110"
                stroke={Colors.border}
                strokeDasharray="3 4"
              />
            ))}

            {/* Filled area */}

            <Path
              d="
                M 0 65
                C 25 45, 42 25, 65 28
                C 85 30, 95 78, 110 80
                C 130 82, 140 20, 160 18
                C 182 16, 200 43, 220 56
                C 240 69, 250 90, 270 98
                C 282 103, 292 105, 300 106
                L 300 110
                L 0 110
                Z
              "
              fill="url(#chartFill)"
            />

            {/* Main chart line */}

            <Path
              d="
                M 0 65
                C 25 45, 42 25, 65 28
                C 85 30, 95 78, 110 80
                C 130 82, 140 20, 160 18
                C 182 16, 200 43, 220 56
                C 240 69, 250 90, 270 98
                C 282 103, 292 105, 300 106
              "
              fill="none"
              stroke={Colors.secondary}
              strokeWidth="2.5"
            />
          </Svg>

          {/* X axis */}

          <View style={styles.xLabels}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <Text key={day} style={styles.axisText}>
                {day}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

/* 
   STYLES
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    paddingBottom: Padding.xl,
    paddingHorizontal: Padding.md,
  },

  /*
     HEADER
   */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: Padding.lg,
    paddingTop: Padding.verticalMd,
    paddingBottom: Padding.lg,

    backgroundColor: Colors.surface,

    borderBottomWidth: BorderWidth.thin,
    borderBottomColor: Colors.border,
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: Heights.iconXl,
    height: Heights.iconXl,

    borderRadius: Radius.full,

    backgroundColor: Colors.primary,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: Margin.sm,
  },

  avatarText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodyLg,

    color: Colors.white,
  },

  greeting: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.caption,

    color: Colors.textSecondary,
  },

  userName: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.bodyMd,

    color: Colors.textPrimary,
  },

  headerActions: {
    flexDirection: 'row',
    gap: Margin.sm,
  },

  headerButton: {
    width: Widths.iconXl,
    height: Heights.iconXl,

    borderRadius: Radius.full,

    backgroundColor: Colors.background,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
  },

  notificationDot: {
    position: 'absolute',

    width: Widths.xs,
    height: Heights.xs,

    borderRadius: Radius.full,

    backgroundColor: Colors.danger,

    top: ms(7),
    right: ms(7),

    borderWidth: 1.5,
    borderColor: Colors.border,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'space-between',

    paddingTop: Padding.lg,
  },

  /*
     PROGRESS CARD
   */

  progressCard: {
    // marginHorizontal: Padding.lg,

    backgroundColor: Colors.surface,

    borderWidth: BorderWidth.thin,
    borderColor: Colors.border,

    borderRadius: Radius.xl,

    padding: Padding.lg,

    marginTop: Margin.sm,
  },

  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodyMd,

    color: Colors.textPrimary,
  },

  chartWrapper: {
    paddingTop: Padding.md,
  },

  chartArea: {
    flexDirection: 'row',
  },

  yLabels: {
    width: ms(24),

    height: vs(125),

    justifyContent: 'space-between',
  },

  chart: {
    flex: 1,
    overflow: 'visible',
  },

  axisText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.labelSm,

    color: Colors.inactive,
  },

  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  /*
     SECTION HEADER
   */

  sectionHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: Padding.lg,

    paddingTop: Padding.xl,
    paddingBottom: Padding.md,
  },

  seeAll: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.primary,
  },
  projectsList: {
    paddingBottom: Padding['5xl'],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Padding['5xl'],
  },
});
