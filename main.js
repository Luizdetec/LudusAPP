const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { spawn } = require('child_process');
const fs = require('fs'); 

// Variável global para manter a referência do processo
let fastApiProcess = null;

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // preload: path.join(__dirname, 'preload.js') 
        }
    });

    // Carregar o Angular (Compilado)
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'dist/Ludus/browser/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    // Mantenha o DevTools para o console do Angular/rede
    //win.webContents.openDevTools(); 
    autohideMenuBar: true;
}

function startFastAPIServer() {
    const apiFileName = 'LudusAPI.exe'; 
    let apiPath;

    if (app.isPackaged) {
        // Ambiente de Produção (Instalado)
        apiPath = path.join(process.resourcesPath, 'backend', apiFileName);
    } else {
        // Ambiente de Desenvolvimento (Rodando via 'npm run electron')
        apiPath = path.join(__dirname, 'backend', apiFileName);
    }
    
    console.log(`Tentando iniciar servidor FastAPI em: ${apiPath}`);

    // --- Verificação de Existência (Para debugging do ENOENT) ---
    if (!fs.existsSync(apiPath)) {
        console.error(`ERRO CRÍTICO (ENOENT): Executável da API não encontrado no caminho: ${apiPath}`);
        // Exibir uma mensagem de erro simples para o usuário final
        return; 
    }
    // --- Fim da Verificação ---

    // =========================================================================
    // CORREÇÃO CRÍTICA: REDIRECIONAMENTO DE LOG PARA ARQUIVO
    // =========================================================================

    const userDataPath = app.getPath('userData'); // Obtém o caminho seguro de dados do usuário
    const logFilePath = path.join(userDataPath, 'api-stdout.log');
    const errorFilePath = path.join(userDataPath, 'api-stderr.log');
    
    console.log(`Logs de Erro da API serão salvos em: ${errorFilePath}`);

    try {
        // Inicia o processo com 'stdio: pipe' para capturar a saída
        fastApiProcess = spawn(apiPath, [], {
            detached: true, // Permite que o processo continue, se necessário
            stdio: 'pipe'
        });

        // Cria streams para escrever a saída em arquivos (flag 'a' para append)
        const outputStream = fs.createWriteStream(logFilePath, { flags: 'w' });
        const errorStream = fs.createWriteStream(errorFilePath, { flags: 'w' });

        // Redireciona a saída do processo para os arquivos
        fastApiProcess.stdout.pipe(outputStream);
        fastApiProcess.stderr.pipe(errorStream);

        // Remove a referência do processo para que o Electron possa sair se necessário
        fastApiProcess.unref(); 

    } catch (error) {
        console.error(`Erro ao iniciar processo spawn: ${error.message}`);
        return;
    }
    // =========================================================================
    // FIM DA CORREÇÃO
    // =========================================================================

    // LOG DE SAÍDA (STDOUT) - Mantido, mas a saída principal está no arquivo
    fastApiProcess.stdout.on('data', (data) => {
        // Ainda logamos no console para desenvolvimento, mas o arquivo é a prioridade
        console.log(`[API]: ${data.toString()}`); 
    });

    // LOG DE ERRO (STDERR)
    fastApiProcess.stderr.on('data', (data) => {
        console.error(`[API ERRO]: ${data.toString()}`);
    });

    // DETECTAR FECHAMENTO INESPERADO
    fastApiProcess.on('close', (code) => {
        console.log(`Servidor FastAPI encerrou com código: ${code}`);
        fastApiProcess = null;
    });
}

function stopFastAPIServer() {
    if (fastApiProcess) {
        console.log('Matando processo da API...');
        // O 'kill' encerra o processo imediatamente. Usamos 'SIGKILL' para garantir.
        fastApiProcess.kill('SIGKILL'); 
        fastApiProcess = null;
    }
}

// --- CICLO DE VIDA DO ELECTRON ---

app.whenReady().then(() => {
    startFastAPIServer(); // 1. Sobe a API
    
    // Pequeno atraso para dar tempo da API iniciar (Opcional, mas seguro após spawn)
    setTimeout(createWindow, 1500); 

    // createWindow();       // Comentado para usar o setTimeout
});

// Evento disparado quando todas as janelas fecham
app.on('window-all-closed', () => {
    stopFastAPIServer(); // Garante que a API morra
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// SEGURANÇA EXTRA: Evento disparado antes do App sair totalmente
app.on('will-quit', () => {
    stopFastAPIServer();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});