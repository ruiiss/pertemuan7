import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
  Animated,
  ScrollView,
} from 'react-native';

// ─── WARNA & TEMA ───────────────────────────────────────────────────────────
const COLORS = {
  bg: '#0F0F1A',
  surface: '#1A1A2E',
  card: '#16213E',
  cardBorder: '#1E2D5A',
  accent: '#E94560',
  accentSoft: '#FF6B6B',
  gold: '#FFD93D',
  teal: '#4ECDC4',
  text: '#F0F0F0',
  textSub: '#8892B0',
  textMuted: '#4A5568',
  done: '#2D3748',
  doneBorder: '#1A202C',
  doneText: '#4A5568',
  HIGH: '#E94560',
  MED: '#FFD93D',
  LOW: '#4ECDC4',
  HIGH_BG: 'rgba(233,69,96,0.15)',
  MED_BG: 'rgba(255,217,61,0.15)',
  LOW_BG: 'rgba(78,205,196,0.15)',
};

const PRIORITIES = ['TINGGI', 'SEDANG', 'RENDAH'];
const FILTERS = ['SEMUA', 'AKTIF', 'SELESAI'];

const PRIORITY_LABELS = { TINGGI: '🔴 Tinggi', SEDANG: '🟡 Sedang', RENDAH: '🟢 Rendah' };
const PRIORITY_COLOR = { TINGGI: COLORS.HIGH, SEDANG: COLORS.gold, RENDAH: COLORS.teal };
const PRIORITY_BG = { TINGGI: COLORS.HIGH_BG, SEDANG: COLORS.MED_BG, RENDAH: COLORS.LOW_BG };

// ─── COUNTER BADGE ───────────────────────────────────────────────────────────
function CounterBadge({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <View style={styles.counterWrap}>
      <View style={styles.counterBar}>
        <View style={[styles.counterFill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.counterText}>
        <Text style={styles.counterDone}>{done}</Text>
        <Text style={styles.counterOf}> dari </Text>
        <Text style={styles.counterTotal}>{total}</Text>
        <Text style={styles.counterOf}> task selesai</Text>
      </Text>
    </View>
  );
}

// ─── TASK CARD ───────────────────────────────────────────────────────────────
function TaskCard({ task, onDelete, onToggle }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleDelete = () => {
    Alert.alert(
      '🗑️ Hapus Task?',
      `"${task.text}" akan dihapus permanen.`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true,
            }).start(() => onDelete(task.id));
          },
        },
      ]
    );
  };

  const isDone = task.done;

  return (
    <Animated.View style={[styles.card, isDone && styles.cardDone, { opacity: fadeAnim }]}>
      <View style={[styles.priorityStripe, { backgroundColor: PRIORITY_COLOR[task.priority] }]} />
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          {/* Checkbox */}
          <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.checkbox} activeOpacity={0.7}>
            <View style={[styles.checkInner, isDone && styles.checkDone]}>
              {isDone && <Text style={styles.checkMark}>✓</Text>}
            </View>
          </TouchableOpacity>

          {/* Task Text */}
          <Text style={[styles.taskText, isDone && styles.taskTextDone]} numberOfLines={2}>
            {task.text}
          </Text>

          {/* Delete */}
          <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn} activeOpacity={0.7}>
            <Text style={styles.deleteIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardMeta}>
          <View style={[styles.priorityBadge, { backgroundColor: PRIORITY_BG[task.priority] }]}>
            <Text style={[styles.priorityText, { color: PRIORITY_COLOR[task.priority] }]}>
              {PRIORITY_LABELS[task.priority]}
            </Text>
          </View>
          {isDone && (
            <View style={styles.doneBadge}>
              <Text style={styles.doneBadgeText}>✅ Selesai</Text>
            </View>
          )}
          <Text style={styles.taskTime}>{task.time}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
function EmptyState({ filter }) {
  const messages = {
    SEMUA: { emoji: '🚀', title: 'Belum ada task!', sub: 'Tambahin task pertama lo sekarang.' },
    AKTIF: { emoji: '✨', title: 'Semua beres!', sub: 'Nggak ada task aktif. Lo keren banget!' },
    SELESAI: { emoji: '🎯', title: 'Belum ada yang selesai', sub: 'Ceklis taskmu dan liat hasilnya di sini.' },
  };
  const msg = messages[filter];
  return (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyEmoji}>{msg.emoji}</Text>
      <Text style={styles.emptyTitle}>{msg.title}</Text>
      <Text style={styles.emptySub}>{msg.sub}</Text>
    </View>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: '1',
      text: 'Ngerjain tugas MyTaskList App 🔥',
      done: false,
      priority: 'TINGGI',
      time: '08:30',
    },
    {
      id: '2',
      text: 'Review materi Expo & React Native',
      done: true,
      priority: 'SEDANG',
      time: '09:00',
    },
    {
      id: '3',
      text: 'Makan siang & istirahat',
      done: false,
      priority: 'RENDAH',
      time: '12:00',
    },
  ]);
  const [selectedPriority, setSelectedPriority] = useState('SEDANG');
  const [activeFilter, setActiveFilter] = useState('SEMUA');
  const [error, setError] = useState('');

  const inputRef = useRef(null);

  // ── Derived state ──
  const doneTasks = tasks.filter((t) => t.done);
  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'AKTIF') return !t.done;
    if (activeFilter === 'SELESAI') return t.done;
    return true;
  });

  // ── Handlers ──
  const handleAdd = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      setError('⚠️  Task nggak boleh kosong, bro!');
      return;
    }
    if (trimmed.length < 3) {
      setError('⚠️  Minimal 3 karakter ya!');
      return;
    }
    setError('');

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTask = {
      id: Date.now().toString(),
      text: trimmed,
      done: false,
      priority: selectedPriority,
      time,
    };
    setTasks((prev) => [newTask, ...prev]);
    setInputText('');
    inputRef.current?.blur();
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Yo, selamat datang 👋</Text>
          <Text style={styles.headerTitle}>MyTaskList</Text>
        </View>
        <View style={styles.headerBadgeWrap}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeNum}>{tasks.length}</Text>
            <Text style={styles.headerBadgeLabel}>Task</Text>
          </View>
        </View>
      </View>

      {/* ── COUNTER ── */}
      <CounterBadge done={doneTasks.length} total={tasks.length} />

      {/* ── FILTER TABS ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setActiveFilter(f)}
            style={[styles.filterTab, activeFilter === f && styles.filterTabActive]}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
              {f}
            </Text>
            {activeFilter === f && <View style={styles.filterDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── TASK LIST ── */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onDelete={handleDelete} onToggle={handleToggle} />
        )}
        ListEmptyComponent={<EmptyState filter={activeFilter} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />

      {/* ── INPUT FORM ── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.formWrap}>
          {/* Priority Selector */}
          <View style={styles.priorityRow}>
            <Text style={styles.priorityLabel}>Prioritas:</Text>
            {PRIORITIES.map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setSelectedPriority(p)}
                style={[
                  styles.priorityPill,
                  { borderColor: PRIORITY_COLOR[p] },
                  selectedPriority === p && { backgroundColor: PRIORITY_COLOR[p] },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.priorityPillText,
                    { color: selectedPriority === p ? '#0F0F1A' : PRIORITY_COLOR[p] },
                  ]}
                >
                  {p === 'TINGGI' ? '🔴' : p === 'SEDANG' ? '🟡' : '🟢'} {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Input Row */}
          <View style={styles.inputRow}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Tambahin task baru..."
              placeholderTextColor={COLORS.textMuted}
              value={inputText}
              onChangeText={(t) => {
                setInputText(t);
                if (error) setError('');
              }}
              onSubmitEditing={handleAdd}
              returnKeyType="done"
              maxLength={100}
              multiline={false}
            />
            <TouchableOpacity onPress={handleAdd} style={styles.addBtn} activeOpacity={0.85}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
  },
  headerSub: {
    color: COLORS.textSub,
    fontSize: 13,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerBadgeWrap: {
    alignItems: 'center',
  },
  headerBadge: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 56,
  },
  headerBadgeNum: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 24,
  },
  headerBadgeLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },

  // Counter
  counterWrap: {
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 8,
  },
  counterBar: {
    height: 4,
    backgroundColor: COLORS.surface,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  counterFill: {
    height: '100%',
    backgroundColor: COLORS.teal,
    borderRadius: 2,
  },
  counterText: {
    fontSize: 12,
  },
  counterDone: { color: COLORS.teal, fontWeight: '700' },
  counterOf: { color: COLORS.textMuted },
  counterTotal: { color: COLORS.text, fontWeight: '700' },

  // Filter
  filterScroll: { maxHeight: 52 },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
  },
  filterTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: COLORS.accent,
  },
  filterText: {
    color: COLORS.textSub,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  filterTextActive: {
    color: '#fff',
  },
  filterDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginTop: 3,
  },

  // List
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 20,
    flexGrow: 1,
  },

  // Card
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  cardDone: {
    backgroundColor: COLORS.done,
    borderColor: COLORS.doneBorder,
    opacity: 0.75,
  },
  priorityStripe: {
    width: 4,
  },
  cardBody: {
    flex: 1,
    padding: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  // Checkbox
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  checkInner: {
    width: 18,
    height: 18,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkDone: {
    backgroundColor: COLORS.teal,
  },
  checkMark: {
    color: '#0F0F1A',
    fontSize: 12,
    fontWeight: '900',
  },

  // Task text
  taskText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: COLORS.doneText,
  },

  // Delete
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(233,69,96,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '700',
  },

  // Card Meta
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  priorityBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  doneBadge: {
    backgroundColor: 'rgba(78,205,196,0.15)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  doneBadgeText: {
    color: COLORS.teal,
    fontSize: 10,
    fontWeight: '700',
  },
  taskTime: {
    marginLeft: 'auto',
    color: COLORS.textMuted,
    fontSize: 11,
  },

  // Empty State
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptySub: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 240,
    lineHeight: 20,
  },

  // Form
  formWrap: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  priorityLabel: {
    color: COLORS.textSub,
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  priorityPill: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  priorityPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  errorText: {
    color: COLORS.accentSoft,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  addBtn: {
    backgroundColor: COLORS.accent,
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
});
