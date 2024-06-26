for i, v in _G do
    -- run-in-roblox
    if (typeof(i) == 'Instance' and i:IsA('ModuleScript')) then
        _G[i] = nil
    -- lune
    elseif (typeof(i) == 'table' and i.instance and i.instance:IsA('ModuleScript')) then
        _G[i] = nil
    end
end

return {}