import React from 'react';
import {
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
import {
  Colors,
  FontSizes,
  Margin,
  Padding,
  Radius,
} from '../../constants/globalStyle';

import { fonts } from '../../constants/fonts';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const user = useSelector(state => state.auth.user);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 
            HEADER
         */}

        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AC</Text>
            </View>

            <View>
              <Text style={styles.greeting}>Good morning 👋</Text>
              <Text style={styles.userName}>Samarth Sable</Text>
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

        {/* STAT CARDS */}

        <View style={styles.statsGrid}>
          <StatCard
            icon="folder-outline"
            iconColor={Colors.primary}
            iconBackground="#EEF4FF"
            value="12"
            label="Projects"
            change="+2"
            positive
          />

          <StatCard
            icon="checkbox-outline"
            iconColor="#8B45FF"
            iconBackground="#F3E9FF"
            value="84"
            label="Tasks"
            change="+8"
            positive
          />

          <StatCard
            icon="time-outline"
            iconColor="#FF9900"
            iconBackground="#FFF6E9"
            value="23"
            label="Pending"
            change="-3"
          />

          <StatCard
            icon="checkmark-circle-outline"
            iconColor="#16C875"
            iconBackground="#E4FAED"
            value="61"
            label="Done"
            change="+11"
            positive
          />
        </View>

        {/* 
            WEEKLY PROGRESS
         */}

        <View style={styles.progressCard}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>

          <WeeklyChart />
        </View>

        {/* 
            ACTIVE PROJECTS HEADER
         */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Projects</Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* 
            PROJECT 1
         */}

        <ProjectCard
          varient={'Home'}
          icon="folder-outline"
          title="Mobile App Redesign"
          progress="68%"
          progressWidth="68%"
          priority="High"
          priorityColor="#FFF0BE"
          priorityTextColor="#B77A00"
        />

        {/* 
            PROJECT 2
         */}

        <ProjectCard
          varient={'Home'}
          icon="folder-outline"
          title="Api Integration v3"
          progress="45%"
          progressWidth="45%"
          priority="Critical"
          priorityColor="#EDE8FF"
          priorityTextColor="#7957D5"
        />
        <ProjectCard
          varient={'Home'}
          icon="folder-outline"
          title="Dashboard Analytics"
          progress="45%"
          progressWidth="45%"
          priority="Medium"
          priorityColor="#EDE8FF"
          priorityTextColor="#7957D5"
        />

        {/* Bottom spacing for tab navigator */}
        <View style={{ height: vs(30) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ========
   WEEKLY CHART
======== */

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
                <Stop offset="0" stopColor="#7B4CFF" stopOpacity="0.20" />

                <Stop offset="1" stopColor="#7B4CFF" stopOpacity="0" />
              </LinearGradient>
            </Defs>

            {/* Horizontal grid lines */}

            <Line
              x1="0"
              y1="5"
              x2="300"
              y2="5"
              stroke="#E8EDF5"
              strokeDasharray="3 4"
            />

            <Line
              x1="0"
              y1="31"
              x2="300"
              y2="31"
              stroke="#E8EDF5"
              strokeDasharray="3 4"
            />

            <Line
              x1="0"
              y1="57"
              x2="300"
              y2="57"
              stroke="#E8EDF5"
              strokeDasharray="3 4"
            />

            <Line
              x1="0"
              y1="83"
              x2="300"
              y2="83"
              stroke="#E8EDF5"
              strokeDasharray="3 4"
            />

            <Line
              x1="0"
              y1="109"
              x2="300"
              y2="109"
              stroke="#E8EDF5"
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
                stroke="#EEF1F6"
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
              stroke="#7444FF"
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

/* ========
   STYLES
======== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },

  scrollContent: {
    paddingBottom: Padding.xl,
  },

  /* 
     HEADER
   */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: Padding.lg,
    paddingTop: vs(12),
    paddingBottom: vs(15),

    backgroundColor: Colors.surface,

    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF2',
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: ms(40),
    height: ms(40),

    borderRadius: Radius.full,

    backgroundColor: Colors.primary,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: Margin.sm,
  },

  avatarText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: '#FFFFFF',
  },

  greeting: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.caption,

    color: Colors.textSecondary,

    marginBottom: 2,
  },

  userName: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.bodyMd,

    color: Colors.textPrimary,
  },

  headerActions: {
    flexDirection: 'row',
    gap: ms(8),
  },

  headerButton: {
    width: ms(38),
    height: ms(38),

    borderRadius: Radius.full,

    backgroundColor: '#F1F4F8',

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
  },

  notificationDot: {
    position: 'absolute',

    width: ms(8),
    height: ms(8),

    borderRadius: Radius.full,

    backgroundColor: '#FF4D4F',

    top: ms(7),
    right: ms(7),

    borderWidth: 1.5,
    borderColor: '#F1F4F8',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'space-between',

    paddingHorizontal: Padding.lg,
    paddingTop: Padding.lg,
  },

  /* 
     PROGRESS CARD
   */

  progressCard: {
    marginHorizontal: Padding.lg,

    backgroundColor: Colors.surface,

    borderWidth: 1,
    borderColor: '#E0E6EF',

    borderRadius: ms(17),

    padding: ms(17),

    marginTop: ms(8),
  },

  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodyMd,

    color: Colors.textPrimary,
  },

  chartWrapper: {
    marginTop: vs(10),
  },

  chartArea: {
    flexDirection: 'row',
  },

  yLabels: {
    width: ms(24),

    height: vs(125),

    justifyContent: 'space-between',

    paddingVertical: 0,
  },

  chart: {
    flex: 1,
    overflow: 'visible',
  },

  axisText: {
    fontFamily: fonts.regular,
    fontSize: ms(9),

    color: '#9AA5B5',
  },

  xLabels: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: vs(2),

    paddingHorizontal: 0,
  },

  /* 
     SECTION HEADER
   */

  sectionHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: Padding.lg,

    marginTop: vs(23),
    marginBottom: vs(13),
  },

  seeAll: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.primary,
  },
});
