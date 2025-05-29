import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.util.ArrayList;

public class PersonGUI extends JFrame {
    private ArrayList<Person> persons = new ArrayList<>();
    private File currentFile = null;
    private boolean dataChanged = false;

    public PersonGUI() {
        setTitle("Person Manager");
        setSize(800, 600);
        setDefaultCloseOperation(DO_NOTHING_ON_CLOSE);

        // Menus
        JMenuBar menuBar = new JMenuBar();
        JMenu fileMenu = new JMenu("File");
        JMenuItem newItem = new JMenuItem("New");
        JMenuItem openItem = new JMenuItem("Open...");
        JMenuItem saveItem = new JMenuItem("Save");
        JMenuItem saveAsItem = new JMenuItem("Save as...");
        JMenuItem exitItem = new JMenuItem("Exit");

        saveItem.setEnabled(false);
        saveAsItem.setEnabled(false);

        newItem.addActionListener(e -> newFile());
        openItem.addActionListener(e -> openFile());
        saveItem.addActionListener(e -> saveFile());
        saveAsItem.addActionListener(e -> saveFileAs());
        exitItem.addActionListener(e -> exitApplication());

        fileMenu.add(newItem);
        fileMenu.add(openItem);
        fileMenu.add(saveItem);
        fileMenu.add(saveAsItem);
        fileMenu.add(exitItem);
        menuBar.add(fileMenu);

        JMenu helpMenu = new JMenu("Help");
        JMenuItem helpItem = new JMenuItem("Help...");
        helpItem.addActionListener(e -> showHelp());
        helpMenu.add(helpItem);
        menuBar.add(helpMenu);

        setJMenuBar(menuBar);

        // Main Panel
        JPanel mainPanel = new JPanel(new BorderLayout());
        JList<Person> personList = new JList<>();
        personList.setListData(persons.toArray(new Person[0]));
        mainPanel.add(new JScrollPane(personList), BorderLayout.CENTER);

        JButton addButton = new JButton("Add Person");
        JButton deleteButton = new JButton("Delete Person");
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(addButton);
        buttonPanel.add(deleteButton);
        mainPanel.add(buttonPanel, BorderLayout.SOUTH);

        add(mainPanel);

        // Window Listener for Close Confirmation
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                exitApplication();
            }
        });

        setVisible(true);
    }

    private void newFile() {
        persons.clear();
        currentFile = null;
        dataChanged = false;
    }

    private void openFile() {
        JFileChooser fileChooser = new JFileChooser();
        if (fileChooser.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) {
            try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(fileChooser.getSelectedFile()))) {
                persons = (ArrayList<Person>) ois.readObject();
                currentFile = fileChooser.getSelectedFile();
                dataChanged = false;
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Error loading file.");
            }
        }
    }

    private void saveFile() {
        if (currentFile == null) {
            saveFileAs();
        } else {
            saveToFile(currentFile);
        }
    }

    private void saveFileAs() {
        JFileChooser fileChooser = new JFileChooser();
        if (fileChooser.showSaveDialog(this) == JFileChooser.APPROVE_OPTION) {
            saveToFile(fileChooser.getSelectedFile());
        }
    }

    private void saveToFile(File file) {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
            oos.writeObject(persons);
            currentFile = file;
            dataChanged = false;
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "Error saving file.");
        }
    }

    private void exitApplication() {
        if (dataChanged) {
            int choice = JOptionPane.showConfirmDialog(this, "Save before exiting?");
            if (choice == JOptionPane.YES_OPTION) {
                saveFile();
            } else if (choice == JOptionPane.CANCEL_OPTION) {
                return;
            }
        }
        System.exit(0);
    }

    private void showHelp() {
        JOptionPane.showMessageDialog(this, "Help contents go here.");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
        new PersonGUI();
        });
    }
}

